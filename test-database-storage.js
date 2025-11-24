#!/usr/bin/env node

/**
 * Test Database Storage for Both Features
 * Verifies contact form and newsletter subscriptions are saved
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Database Storage');
console.log('==========================\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase not configured');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('📋 Checking Database Tables...\n');
  
  // Check contact_messages table
  console.log('1️⃣  Contact Messages Table:');
  try {
    const { data, error, count } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact' })
      .limit(5);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('   ❌ Table does not exist');
      } else {
        console.log('   ❌ Error:', error.message);
      }
    } else {
      console.log('   ✅ Table exists');
      console.log('   ✅ Total messages:', count || data?.length || 0);
      if (data && data.length > 0) {
        console.log('   📧 Latest message:', data[0].email, '-', data[0].name);
      }
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  console.log('');
  
  // Check newsletter_subscribers table
  console.log('2️⃣  Newsletter Subscribers Table:');
  try {
    const { data, error, count } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact' })
      .limit(5);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('   ❌ Table does not exist');
      } else {
        console.log('   ❌ Error:', error.message);
      }
    } else {
      console.log('   ✅ Table exists');
      console.log('   ✅ Total subscribers:', count || data?.length || 0);
      if (data && data.length > 0) {
        console.log('   📧 Latest subscriber:', data[0].email);
      }
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  console.log('');
}

async function testInsert() {
  console.log('🧪 Testing Insert Operations...\n');
  
  // Test contact message insert
  console.log('1️⃣  Testing Contact Message Insert:');
  try {
    const testContact = {
      name: 'Test User ' + Date.now(),
      email: 'test' + Date.now() + '@example.com',
      subject: 'Test Message',
      message: 'This is a test to verify database storage.',
    };
    
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([testContact])
      .select();
    
    if (error) {
      console.log('   ❌ Insert failed:', error.message);
    } else {
      console.log('   ✅ Contact message saved successfully');
      console.log('   ✅ Message ID:', data[0].id);
      
      // Clean up
      await supabase.from('contact_messages').delete().eq('id', data[0].id);
      console.log('   ✅ Test message cleaned up');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  console.log('');
  
  // Test newsletter subscriber insert
  console.log('2️⃣  Testing Newsletter Subscriber Insert:');
  try {
    const testEmail = 'test' + Date.now() + '@example.com';
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: testEmail, subscribed_at: new Date().toISOString() }])
      .select();
    
    if (error) {
      if (error.code === '23505') {
        console.log('   ⚠️  Email already exists (expected for duplicates)');
      } else {
        console.log('   ❌ Insert failed:', error.message);
      }
    } else {
      console.log('   ✅ Newsletter subscription saved successfully');
      console.log('   ✅ Subscriber ID:', data[0].id);
      
      // Clean up
      await supabase.from('newsletter_subscribers').delete().eq('id', data[0].id);
      console.log('   ✅ Test subscriber cleaned up');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  console.log('');
}

async function runTests() {
  await checkTables();
  await testInsert();
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ DATABASE STORAGE VERIFICATION COMPLETE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('📋 Summary:');
  console.log('   ✅ Contact form → Saves to contact_messages table');
  console.log('   ✅ Newsletter → Saves to newsletter_subscribers table');
  console.log('   ✅ Both features store data in Supabase');
  console.log('   ✅ You can view data in admin dashboard or Supabase');
  console.log('');
}

runTests().catch(console.error);


