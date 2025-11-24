#!/usr/bin/env node

/**
 * Get Gmail OAuth2 Refresh Token using Production URL
 * Uses the deployed website for redirect URI
 */

const readline = require('readline');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
// Use production URL for redirect
const REDIRECT_URI = 'https://nexthardware.io/api/auth/gmail/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Error: GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET must be set in .env.local');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

async function getRefreshToken() {
  try {
    // Generate authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent', // Force consent screen to get refresh token
    });

    console.log('');
    console.log('🔐 Gmail OAuth2 Setup (Using Production URL)');
    console.log('============================================');
    console.log('');
    console.log('📋 Using redirect URI: https://nexthardware.io/api/auth/gmail/callback');
    console.log('');
    console.log('1. Open this URL in your browser:');
    console.log('');
    console.log(authUrl);
    console.log('');
    console.log('2. Sign in with your Gmail account');
    console.log('3. Click "Allow" to grant permissions');
    console.log('4. You\'ll be redirected to: https://nexthardware.io/api/auth/gmail/callback?code=XXXXX');
    console.log('5. Copy the ENTIRE URL from the address bar (or just the code part)');
    console.log('');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Paste the authorization code or full URL here: ', async (code) => {
      try {
        // Extract code from URL if user pasted full URL
        const codeMatch = code.match(/code=([^&]+)/);
        const authCode = codeMatch ? codeMatch[1] : code.trim();

        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(authCode);
        
        if (tokens.refresh_token) {
          console.log('');
          console.log('✅ Success! Here is your refresh token:');
          console.log('');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log(tokens.refresh_token);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('');
          
          // Save to .env.local
          const envFile = path.join(__dirname, '.env.local');
          let content = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf8') : '';
          
          if (content.includes('GMAIL_REFRESH_TOKEN=')) {
            content = content.replace(/GMAIL_REFRESH_TOKEN=.*/g, `GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
          } else {
            content += `GMAIL_REFRESH_TOKEN=${tokens.refresh_token}\n`;
          }
          
          fs.writeFileSync(envFile, content);
          
          console.log('✅ Refresh token saved to .env.local');
          console.log('');
          console.log('📋 Next: Add to Vercel environment variables:');
          console.log('   Name: GMAIL_REFRESH_TOKEN');
          console.log(`   Value: ${tokens.refresh_token}`);
          console.log('');
          console.log('✅ Setup complete! Your Gmail OAuth2 is now configured.');
        } else {
          console.error('❌ No refresh token received. Make sure you:');
          console.error('   1. Used prompt=consent in the auth URL');
          console.error('   2. Clicked "Allow" on the consent screen');
          console.error('   3. Are not reusing an existing authorization');
        }
      } catch (error) {
        console.error('❌ Error exchanging code for token:', error.message);
        if (error.message.includes('redirect_uri_mismatch')) {
          console.error('');
          console.error('⚠️  Redirect URI mismatch!');
          console.error('   Make sure https://nexthardware.io/api/auth/gmail/callback');
          console.error('   is added to your OAuth2 client\'s authorized redirect URIs');
        }
      }
      
      rl.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getRefreshToken();

