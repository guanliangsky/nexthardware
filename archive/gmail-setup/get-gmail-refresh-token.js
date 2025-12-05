#!/usr/bin/env node

/**
 * Helper script to get Gmail OAuth2 Refresh Token
 * 
 * Usage:
 *   1. Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET in .env.local
 *   2. Run: node get-gmail-refresh-token.js
 *   3. Follow the instructions to authorize and get refresh token
 */

const readline = require('readline');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/api/auth/gmail/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Error: GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET must be set in .env.local');
  console.error('');
  console.error('Add these to your .env.local file:');
  console.error('GMAIL_CLIENT_ID=your_client_id_here');
  console.error('GMAIL_CLIENT_SECRET=your_client_secret_here');
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
    console.log('🔐 Gmail OAuth2 Setup');
    console.log('====================');
    console.log('');
    console.log('1. Open this URL in your browser:');
    console.log('');
    console.log(authUrl);
    console.log('');
    console.log('2. Sign in with your Gmail account');
    console.log('3. Click "Allow" to grant permissions');
    console.log('4. Copy the authorization code from the redirect URL');
    console.log('   (It will look like: http://localhost:3000/api/auth/gmail/callback?code=XXXXX)');
    console.log('');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Paste the authorization code here: ', async (code) => {
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
          console.log('📋 Add this to your .env.local file:');
          console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
          console.log('');
          console.log('📋 And add to Vercel environment variables:');
          console.log('   Name: GMAIL_REFRESH_TOKEN');
          console.log(`   Value: ${tokens.refresh_token}`);
          console.log('');
          console.log('✅ Done! Your Gmail OAuth2 is now configured.');
        } else {
          console.error('❌ No refresh token received. Make sure you:');
          console.error('   1. Used prompt=consent in the auth URL');
          console.error('   2. Clicked "Allow" on the consent screen');
          console.error('   3. Are not reusing an existing authorization');
        }
      } catch (error) {
        console.error('❌ Error exchanging code for token:', error.message);
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

