#!/usr/bin/env node

/**
 * Test Gmail Send Scope Specifically
 * This tests the actual scope we need for sending emails
 */

require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

console.log('🔍 Testing Gmail Send Scope');
console.log('==========================\n');

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('❌ Missing required environment variables!');
  process.exit(1);
}

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
    console.log('  Expires at:', credentials.expiry_date ? new Date(credentials.expiry_date).toISOString() : 'N/A');
    console.log('  Scope:', credentials.scope || 'Not provided in token response');
    console.log('');
    
    // Set the refreshed credentials
    oauth2Client.setCredentials(credentials);
    
    console.log('📋 Testing Gmail API with send scope...\n');
    
    // Test Gmail API - try to send a test email
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Create a simple test email
    const senderEmail = process.env.GMAIL_SENDER_EMAIL || 'liangoptics@gmail.com';
    const testEmail = `To: ${senderEmail}\r\n` +
      `From: ${senderEmail}\r\n` +
      `Subject: Test Email - Gmail API Scope Test\r\n` +
      `Content-Type: text/plain; charset=utf-8\r\n\r\n` +
      `This is a test email to verify Gmail send scope.`;
    
    const encodedEmail = Buffer.from(testEmail)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    return gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
      },
    });
  })
  .then((result) => {
    console.log('✅ Gmail send test successful!');
    console.log('  Message ID:', result.data.id);
    console.log('');
    console.log('✅ Gmail send scope is working correctly!');
    console.log('   You can now send emails via Gmail API.');
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    console.error('❌ Error code:', error.code);
    if (error.response) {
      console.error('❌ Response status:', error.response.status);
      console.error('❌ Response data:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('');
    
    if (error.code === 403 && error.message.includes('insufficient')) {
      console.error('💡 The refresh token might not have gmail.send scope.');
      console.error('   Try getting a new refresh token:');
      console.error('   node get-gmail-refresh-token-production.js');
      console.error('');
      console.error('   Make sure when you authorize, you grant "Send email" permission.');
    }
    
    process.exit(1);
  });

