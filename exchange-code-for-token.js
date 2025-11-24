#!/usr/bin/env node

/**
 * Exchange authorization code for refresh token
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = 'https://nexthardware.io/api/auth/gmail/callback';
const AUTH_CODE = '4/0Ab32j932QmWJvE5poWZ44CquceFzpM2AOeUjqXZNXjUGy6auLs-QXoGOi_V4gUudeRbA0g';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Error: GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET must be set');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

async function exchangeCode() {
  try {
    console.log('🔐 Exchanging authorization code for tokens...\n');
    
    const { tokens } = await oauth2Client.getToken(AUTH_CODE);
    
    if (tokens.refresh_token) {
      console.log('✅ Success! Refresh token obtained!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Refresh Token:');
      console.log(tokens.refresh_token);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      // Save to .env.local
      const envFile = path.join(__dirname, '.env.local');
      let content = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf8') : '';
      
      if (content.includes('GMAIL_REFRESH_TOKEN=')) {
        content = content.replace(/GMAIL_REFRESH_TOKEN=.*/g, `GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
      } else {
        content += `GMAIL_REFRESH_TOKEN=${tokens.refresh_token}\n`;
      }
      
      fs.writeFileSync(envFile, content);
      
      console.log('✅ Refresh token saved to .env.local\n');
      console.log('📋 Next Steps:');
      console.log('   1. Add to Vercel environment variables:');
      console.log('      Name: GMAIL_REFRESH_TOKEN');
      console.log(`      Value: ${tokens.refresh_token}`);
      console.log('   2. Test locally: npm run dev');
      console.log('   3. Test contact form: http://localhost:3000/contact');
      console.log('');
      console.log('✅ Gmail OAuth2 setup complete!');
    } else {
      console.error('❌ No refresh token received');
      console.error('Tokens:', tokens);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

exchangeCode();




