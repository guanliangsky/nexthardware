// Test Resend API setup
require('dotenv').config({ path: '.env.local' });

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY not found in .env.local');
  process.exit(1);
}

console.log('✅ RESEND_API_KEY found:', RESEND_API_KEY.substring(0, 15) + '...');
console.log('📧 Testing Resend API connection...');

fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'Next Hardware <onboarding@resend.dev>',
    to: 'guanliangsky@gmail.com',
    subject: 'Resend API Test - Setup Verification',
    html: '<h2>Resend Setup Test</h2><p>If you receive this, Resend is configured correctly!</p>',
    text: 'Resend Setup Test - If you receive this, Resend is configured correctly!',
  }),
})
  .then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Resend API test successful!');
      console.log('📧 Email ID:', data.id);
      console.log('✅ Check your inbox: guanliangsky@gmail.com');
    } else {
      const error = await response.json();
      console.error('❌ Resend API error:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Network error:', error.message);
    process.exit(1);
  });


