#!/usr/bin/env node

/**
 * Create OAuth2 Client via Google Cloud API
 * This uses the Identity Platform API to create OAuth2 clients
 */

const { execSync } = require('child_process');
const https = require('https');

const PROJECT_ID = 'next-hardware-email';
const CLIENT_NAME = 'Next Hardware Email Client';
const REDIRECT_URIS = [
  'http://localhost:3000/api/auth/gmail/callback',
  'https://nexthardware.io/api/auth/gmail/callback'
];

async function getAccessToken() {
  try {
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
    return token;
  } catch (error) {
    console.error('❌ Error getting access token. Make sure you are logged in:');
    console.error('   Run: gcloud auth login');
    process.exit(1);
  }
}

async function createOAuth2Client(accessToken) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      displayName: CLIENT_NAME,
      type: 'WEB',
      allowedRedirectUris: REDIRECT_URIS
    });

    const options = {
      hostname: 'identitytoolkit.googleapis.com',
      path: `/v2/projects/${PROJECT_ID}/oauthClients`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            resolve(response);
          } catch (e) {
            reject(new Error(`Failed to parse response: ${data}`));
          }
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🔐 Creating OAuth2 Client via API');
  console.log('==================================\n');
  console.log(`Project: ${PROJECT_ID}\n`);

  try {
    // Get access token
    console.log('📋 Getting access token...');
    const accessToken = await getAccessToken();
    console.log('✅ Access token obtained\n');

    // Create OAuth2 client
    console.log('📋 Creating OAuth2 client...');
    const response = await createOAuth2Client(accessToken);
    
    console.log('✅ OAuth2 client created successfully!\n');
    console.log('📋 Credentials:');
    console.log(`   Client ID: ${response.clientId || response.oauthClientId}`);
    console.log(`   Client Secret: ${response.clientSecret || 'Check in console'}\n`);
    
    // Save to .env.local
    const fs = require('fs');
    const path = require('path');
    const envFile = path.join(__dirname, '.env.local');
    
    let envContent = '';
    if (fs.existsSync(envFile)) {
      envContent = fs.readFileSync(envFile, 'utf8');
    }
    
    const clientId = response.clientId || response.oauthClientId;
    const clientSecret = response.clientSecret || '';
    
    // Update or add GMAIL_CLIENT_ID
    if (envContent.includes('GMAIL_CLIENT_ID=')) {
      envContent = envContent.replace(/GMAIL_CLIENT_ID=.*/g, `GMAIL_CLIENT_ID=${clientId}`);
    } else {
      envContent += `\nGMAIL_CLIENT_ID=${clientId}\n`;
    }
    
    // Update or add GMAIL_CLIENT_SECRET
    if (clientSecret) {
      if (envContent.includes('GMAIL_CLIENT_SECRET=')) {
        envContent = envContent.replace(/GMAIL_CLIENT_SECRET=.*/g, `GMAIL_CLIENT_SECRET=${clientSecret}`);
      } else {
        envContent += `GMAIL_CLIENT_SECRET=${clientSecret}\n`;
      }
    }
    
    fs.writeFileSync(envFile, envContent);
    console.log('✅ Credentials saved to .env.local\n');
    
    if (!clientSecret) {
      console.log('⚠️  Note: Client Secret might need to be retrieved from Google Cloud Console');
      console.log('   Go to: https://console.cloud.google.com/apis/credentials\n');
    }
    
    console.log('📋 Next: Get refresh token');
    console.log('   Run: node get-gmail-refresh-token.js\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n💡 Alternative: Use web UI');
    console.error('   Go to: https://console.cloud.google.com/apis/credentials');
    console.error('   Or run: ./setup-oauth2-cli.sh\n');
    process.exit(1);
  }
}

main();

