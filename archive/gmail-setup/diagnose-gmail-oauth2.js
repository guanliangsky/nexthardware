#!/usr/bin/env node

/**
 * Diagnose Gmail OAuth2 Issues
 */

require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

console.log('🔍 Gmail OAuth2 Diagnostic');
console.log('==========================\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log('  GMAIL_CLIENT_ID:', CLIENT_ID ? `✅ Set (${CLIENT_ID.substring(0, 30)}...)` : '❌ Not set');
console.log('  GMAIL_CLIENT_SECRET:', CLIENT_SECRET ? `✅ Set (${CLIENT_SECRET.substring(0, 10)}...)` : '❌ Not set');
console.log('  GMAIL_REFRESH_TOKEN:', REFRESH_TOKEN ? `✅ Set (${REFRESH_TOKEN.length} chars)` : '❌ Not set');
console.log('');

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('❌ Missing required environment variables!');
  process.exit(1);
}

// Test OAuth2 refresh
console.log('📋 Testing OAuth2 Token Refresh...\n');

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'https://nexthardware.io/api/auth/gmail/callback'
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

oauth2Client.refreshAccessToken()
  .then(({ credentials }) => {
    console.log('✅ Access token refresh successful!');
    console.log('  Access token obtained');
    console.log('  Expires at:', credentials.expiry_date ? new Date(credentials.expiry_date).toISOString() : 'N/A');
    console.log('');
    console.log('📋 Testing Gmail API access...\n');
    
    // Test Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    return gmail.users.getProfile({ userId: 'me' });
  })
  .then((profile) => {
    console.log('✅ Gmail API access successful!');
    console.log('  Email address:', profile.data.emailAddress);
    console.log('');
    console.log('✅ All checks passed! OAuth2 is working correctly.');
    console.log('');
    console.log('📋 If emails still fail, the issue might be:');
    console.log('   - Sender email mismatch');
    console.log('   - Gmail API send permissions');
    console.log('   - Email format issue');
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    console.error('❌ Error code:', error.code);
    if (error.response) {
      console.error('❌ Response status:', error.response.status);
      console.error('❌ Response data:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('');
    console.error('💡 Common fixes:');
    if (error.message.includes('invalid_grant') || error.message.includes('invalid_token')) {
      console.error('   - Refresh token is invalid or expired');
      console.error('   - Get a new refresh token: node get-gmail-refresh-token-production.js');
    }
    if (error.code === 401) {
      console.error('   - Authentication failed - check Client ID and Secret');
    }
    if (error.code === 403) {
      console.error('   - Permission denied - check Gmail API is enabled');
      console.error('   - Check OAuth2 scopes are correct');
    }
    process.exit(1);
  });

