#!/usr/bin/env node

/**
 * Create OAuth2 Client via CLI - Multiple Methods
 * Tries various Google Cloud APIs to create OAuth2 client
 */

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'next-hardware-email';
const CLIENT_NAME = 'Next Hardware Email Client';
const REDIRECT_URIS = [
  'http://localhost:3000/api/auth/gmail/callback',
  'https://nexthardware.io/api/auth/gmail/callback'
];

function getAccessToken() {
  try {
    return execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('❌ Error getting access token');
    process.exit(1);
  }
}

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, data: data });
          }
        } else {
          reject({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function tryMethod1(accessToken) {
  // Try Identity Platform API
  console.log('📋 Method 1: Trying Identity Platform API...');
  const postData = JSON.stringify({
    displayName: CLIENT_NAME,
    type: 'WEB',
    allowedRedirectUris: REDIRECT_URIS
  });

  try {
    const response = await makeRequest({
      hostname: 'identitytoolkit.googleapis.com',
      path: `/v2/projects/${PROJECT_ID}/oauthClients`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, postData);

    if (response.data.clientId || response.data.oauthClientId) {
      return {
        clientId: response.data.clientId || response.data.oauthClientId,
        clientSecret: response.data.clientSecret || null
      };
    }
  } catch (error) {
    // Method failed, try next
  }
  return null;
}

async function tryMethod2(accessToken) {
  // Try IAM Credentials API
  console.log('📋 Method 2: Trying IAM Credentials API...');
  const postData = JSON.stringify({
    name: CLIENT_NAME,
    type: 'WEB_APPLICATION',
    redirectUris: REDIRECT_URIS
  });

  try {
    const response = await makeRequest({
      hostname: 'iamcredentials.googleapis.com',
      path: `/v1/projects/${PROJECT_ID}/oauthClients`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, postData);

    if (response.data.clientId) {
      return {
        clientId: response.data.clientId,
        clientSecret: response.data.clientSecret || null
      };
    }
  } catch (error) {
    // Method failed
  }
  return null;
}

async function tryMethod3(accessToken) {
  // Try using gcloud alpha commands
  console.log('📋 Method 3: Trying gcloud alpha commands...');
  try {
    // Check if gcloud alpha iap exists
    const help = execSync('gcloud alpha iap oauth-clients --help 2>&1', { encoding: 'utf8' });
    if (help.includes('create')) {
      console.log('   Found gcloud alpha iap command, but it requires specific setup...');
    }
  } catch (e) {
    // Not available
  }
  return null;
}

async function configureConsentScreen(accessToken) {
  console.log('📋 Checking/Configuring OAuth Consent Screen...');
  
  const consentData = JSON.stringify({
    consentScreen: {
      applicationTitle: 'Next Hardware Email',
      supportEmail: 'guanliangsky@gmail.com',
      developerContactEmail: 'guanliangsky@gmail.com',
      userType: 'EXTERNAL'
    }
  });

  try {
    // Try to get existing consent screen
    const getResponse = await makeRequest({
      hostname: 'oauth2.googleapis.com',
      path: `/v1/projects/${PROJECT_ID}/oauthConsentScreen`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log('✅ OAuth Consent Screen exists');
    return true;
  } catch (error) {
    // Try to create it
    try {
      await makeRequest({
        hostname: 'oauth2.googleapis.com',
        path: `/v1/projects/${PROJECT_ID}/oauthConsentScreen`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Content-Length': consentData.length
        }
      }, consentData);
      console.log('✅ OAuth Consent Screen configured');
      return true;
    } catch (e) {
      console.log('⚠️  Could not configure consent screen via API');
      return false;
    }
  }
}

function saveCredentials(clientId, clientSecret) {
  const envFile = path.join(__dirname, '.env.local');
  let content = '';
  
  if (fs.existsSync(envFile)) {
    content = fs.readFileSync(envFile, 'utf8');
  }
  
  // Update or add CLIENT_ID
  if (content.includes('GMAIL_CLIENT_ID=')) {
    content = content.replace(/GMAIL_CLIENT_ID=.*/g, `GMAIL_CLIENT_ID=${clientId}`);
  } else {
    content += `\nGMAIL_CLIENT_ID=${clientId}\n`;
  }
  
  // Update or add CLIENT_SECRET
  if (clientSecret) {
    if (content.includes('GMAIL_CLIENT_SECRET=')) {
      content = content.replace(/GMAIL_CLIENT_SECRET=.*/g, `GMAIL_CLIENT_SECRET=${clientSecret}`);
    } else {
      content += `GMAIL_CLIENT_SECRET=${clientSecret}\n`;
    }
  }
  
  fs.writeFileSync(envFile, content);
  console.log('✅ Credentials saved to .env.local');
}

async function main() {
  console.log('🔐 Creating OAuth2 Client via CLI (All Methods)');
  console.log('================================================\n');
  console.log(`Project: ${PROJECT_ID}\n`);

  const accessToken = getAccessToken();
  console.log('✅ Access token obtained\n');

  // Try to configure consent screen first
  await configureConsentScreen(accessToken);
  console.log('');

  // Try all methods
  let credentials = null;
  
  credentials = await tryMethod1(accessToken);
  if (credentials) {
    console.log('✅ Method 1 succeeded!\n');
  } else {
    credentials = await tryMethod2(accessToken);
    if (credentials) {
      console.log('✅ Method 2 succeeded!\n');
    } else {
      await tryMethod3(accessToken);
    }
  }

  if (credentials && credentials.clientId) {
    console.log('✅ OAuth2 client created successfully!\n');
    console.log('📋 Credentials:');
    console.log(`   Client ID: ${credentials.clientId}`);
    if (credentials.clientSecret) {
      console.log(`   Client Secret: ${credentials.clientSecret}`);
    } else {
      console.log('   ⚠️  Client Secret: Need to retrieve from console');
    }
    console.log('');

    saveCredentials(credentials.clientId, credentials.clientSecret);

    if (credentials.clientSecret) {
      console.log('📋 Next: Getting refresh token...\n');
      try {
        execSync('node get-gmail-refresh-token.js', { stdio: 'inherit' });
      } catch (e) {
        console.log('Run manually: node get-gmail-refresh-token.js');
      }
    } else {
      console.log('📋 Next steps:');
      console.log('   1. Get Client Secret from: https://console.cloud.google.com/apis/credentials');
      console.log('   2. Add to .env.local: GMAIL_CLIENT_SECRET=your_secret');
      console.log('   3. Run: node get-gmail-refresh-token.js');
    }
  } else {
    console.log('❌ All CLI methods failed');
    console.log('');
    console.log('💡 OAuth2 client creation via API is not publicly available');
    console.log('   Google requires using the web UI for security reasons.');
    console.log('');
    console.log('📋 Quick alternative:');
    console.log('   1. Go to: https://console.cloud.google.com/apis/credentials');
    console.log('   2. Create OAuth2 client (2 minutes)');
    console.log('   3. Run: ./add-oauth-credentials.sh');
    console.log('   4. I\'ll automatically get refresh token via CLI!');
  }
}

main().catch(console.error);

