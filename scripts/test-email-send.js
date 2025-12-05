// Test email sending for member registration
const { sendMemberWelcomeEmail } = require('../lib/formspree');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('📧 Testing member welcome email...\n');
  console.log('Formspree Contact Form ID:', process.env.FORMSPREE_CONTACT_FORM_ID || 'NOT SET');
  console.log('Contact Email:', process.env.CONTACT_EMAIL || 'hello@nexthardware.io (default)');
  console.log('');
  
  if (!process.env.FORMSPREE_CONTACT_FORM_ID) {
    console.log('❌ FORMSPREE_CONTACT_FORM_ID is not set!');
    console.log('Please set it in .env.local or Vercel environment variables.');
    return;
  }
  
  try {
    const result = await sendMemberWelcomeEmail({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1 (555) 123-4567'
    });
    
    if (result) {
      console.log('✅ Email sent successfully!');
      console.log('Check the recipient email inbox.');
    } else {
      console.log('❌ Email sending failed (returned false)');
    }
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
}

testEmail();


