#!/usr/bin/env node

/**
 * Test Gmail OAuth2 locally to debug the issue
 */

require('dotenv').config({ path: '.env.local' });
const { sendEmailViaGmail } = require('./lib/gmail');

async function test() {
  console.log('🧪 Testing Gmail OAuth2 Locally');
  console.log('================================\n');
  
  console.log('📋 Environment Variables:');
  console.log('  GMAIL_CLIENT_ID:', process.env.GMAIL_CLIENT_ID ? '✅ Set' : '❌ Not set');
  console.log('  GMAIL_CLIENT_SECRET:', process.env.GMAIL_CLIENT_SECRET ? '✅ Set' : '❌ Not set');
  console.log('  GMAIL_REFRESH_TOKEN:', process.env.GMAIL_REFRESH_TOKEN ? '✅ Set' : '❌ Not set');
  console.log('  GMAIL_SENDER_EMAIL:', process.env.GMAIL_SENDER_EMAIL || 'Not set (using default)');
  console.log('');
  
  console.log('📋 Testing email send...\n');
  
  const result = await sendEmailViaGmail({
    to: 'liangoptics@gmail.com',
    subject: 'Local Gmail OAuth2 Test',
    html: '<h2>Test Email</h2><p>This is a test from local debugging.</p>',
    text: 'Test Email\n\nThis is a test from local debugging.',
  });
  
  console.log('');
  if (result) {
    console.log('✅ Email sent successfully!');
  } else {
    console.log('❌ Email sending failed');
    console.log('Check the error messages above for details');
  }
}

test().catch(console.error);

