#!/usr/bin/env node

/**
 * Final comprehensive CLI attempt - All possible methods
 */

const { execSync } = require('child_process');
const https = require('https');

const PROJECT_ID = 'next-hardware-email';
const CLIENT_NAME = 'Next Hardware Email Client';
const REDIRECT_URIS = [
  'http://localhost:3000/api/auth/gmail/callback',
  'https://nexthardware.io/api/auth/gmail/callback'
];

function getAccessToken() {
  return execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
}

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data });
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function tryAllMethods() {
  console.log('🔐 Final CLI Attempt - All Methods');
  console.log('==================================\n');
  
  const accessToken = getAccessToken();
  console.log('✅ Access token obtained\n');

  const methods = [
    {
      name: 'Identity Platform API',
      host: 'identitytoolkit.googleapis.com',
      path: `/v2/projects/${PROJECT_ID}/oauthClients`,
      data: JSON.stringify({
        displayName: CLIENT_NAME,
        type: 'WEB',
        allowedRedirectUris: REDIRECT_URIS
      })
    },
    {
      name: 'IAM Credentials API',
      host: 'iamcredentials.googleapis.com',
      path: `/v1/projects/${PROJECT_ID}/oauthClients`,
      data: JSON.stringify({
        name: CLIENT_NAME,
        type: 'WEB_APPLICATION',
        redirectUris: REDIRECT_URIS
      })
    },
    {
      name: 'OAuth2 API',
      host: 'oauth2.googleapis.com',
      path: `/v1/projects/${PROJECT_ID}/oauthClients`,
      data: JSON.stringify({
        name: CLIENT_NAME,
        type: 'WEB',
        redirectUris: REDIRECT_URIS
      })
    },
    {
      name: 'Cloud Resource Manager API',
      host: 'cloudresourcemanager.googleapis.com',
      path: `/v1/projects/${PROJECT_ID}:createOAuthClient`,
      data: JSON.stringify({
        oauthClient: {
          displayName: CLIENT_NAME,
          type: 'WEB',
          redirectUris: REDIRECT_URIS
        }
      })
    }
  ];

  for (const method of methods) {
    console.log(`📋 Trying: ${method.name}...`);
    try {
      const response = await makeRequest({
        hostname: method.host,
        path: method.path,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Content-Length': method.data.length
        }
      }, method.data);

      if (response.status === 200 || response.status === 201) {
        console.log(`✅ ${method.name} succeeded!`);
        console.log(`Response: ${response.data.substring(0, 200)}...`);
        
        // Try to parse response
        try {
          const parsed = JSON.parse(response.data);
          if (parsed.clientId || parsed.oauthClientId || parsed.id) {
            return {
              success: true,
              clientId: parsed.clientId || parsed.oauthClientId || parsed.id,
              clientSecret: parsed.clientSecret || null,
              method: method.name
            };
          }
        } catch (e) {
          // Not JSON, but might still be success
        }
      } else {
        console.log(`❌ ${method.name} failed: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${method.name} error: ${error.message}`);
    }
    console.log('');
  }

  return { success: false };
}

async function main() {
  const result = await tryAllMethods();
  
  if (result.success) {
    console.log('✅ SUCCESS! OAuth2 client created via CLI!\n');
    console.log(`Client ID: ${result.clientId}`);
    if (result.clientSecret) {
      console.log(`Client Secret: ${result.clientSecret}`);
    }
    console.log(`Method used: ${result.method}\n`);
    
    // Save to .env.local
    const fs = require('fs');
    const path = require('path');
    const envFile = path.join(__dirname, '.env.local');
    let content = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf8') : '';
    
    if (content.includes('GMAIL_CLIENT_ID=')) {
      content = content.replace(/GMAIL_CLIENT_ID=.*/g, `GMAIL_CLIENT_ID=${result.clientId}`);
    } else {
      content += `\nGMAIL_CLIENT_ID=${result.clientId}\n`;
    }
    
    if (result.clientSecret) {
      if (content.includes('GMAIL_CLIENT_SECRET=')) {
        content = content.replace(/GMAIL_CLIENT_SECRET=.*/g, `GMAIL_CLIENT_SECRET=${result.clientSecret}`);
      } else {
        content += `GMAIL_CLIENT_SECRET=${result.clientSecret}\n`;
      }
    }
    
    fs.writeFileSync(envFile, content);
    console.log('✅ Credentials saved to .env.local\n');
    
    if (result.clientSecret) {
      console.log('📋 Getting refresh token...\n');
      try {
        execSync('node get-gmail-refresh-token.js', { stdio: 'inherit' });
      } catch (e) {
        console.log('Run: node get-gmail-refresh-token.js');
      }
    }
  } else {
    console.log('❌ All CLI methods failed');
    console.log('');
    console.log('💡 Unfortunately, Google Cloud does not provide a public API');
    console.log('   for creating OAuth2 clients. This is by design for security.');
    console.log('');
    console.log('📋 The web UI is the only way to create OAuth2 clients.');
    console.log('   However, I can automate everything else via CLI!');
    console.log('');
    console.log('🚀 Next step: Create OAuth2 client in browser (2 minutes)');
    console.log('   Then run: ./add-credentials-now.sh');
  }
}

main().catch(console.error);


