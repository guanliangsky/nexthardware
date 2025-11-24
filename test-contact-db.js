#!/usr/bin/env node

/**
 * Test Contact Form Database Submission
 * Verifies that form submissions are saved to Supabase
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🧪 Testing Contact Form Database Submission');
console.log('==========================================\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase not configured!');
  console.error('   Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log('✅ Supabase configured');
console.log('   URL:', supabaseUrl.substring(0, 30) + '...');
console.log('   Key:', supabaseKey.substring(0, 20) + '...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  console.log('📋 Testing database connection...\n');
  
  try {
    // Test 1: Check if table exists by trying to query it
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
        console.error('❌ Table "contact_messages" does not exist!');
        console.error('   You need to create this table in Supabase.\n');
        console.log('📋 SQL to create table:');
        console.log(`
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert (for API)
CREATE POLICY "Allow service role insert" ON contact_messages
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service role to select (for admin)
CREATE POLICY "Allow service role select" ON contact_messages
  FOR SELECT
  TO service_role
  USING (true);
        `);
        return false;
      }
      throw error;
    }
    
    console.log('✅ Table "contact_messages" exists');
    console.log('   Found', data?.length || 0, 'existing messages\n');
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return false;
  }
}

async function testInsert() {
  console.log('📋 Testing insert operation...\n');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Message',
    message: 'This is a test message to verify database submission works.',
  };
  
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([testData])
      .select();
    
    if (error) {
      console.error('❌ Insert failed:', error.message);
      console.error('   Error code:', error.code);
      console.error('   Error details:', JSON.stringify(error, null, 2));
      return false;
    }
    
    if (!data || data.length === 0) {
      console.error('❌ Insert succeeded but no data returned');
      return false;
    }
    
    console.log('✅ Insert successful!');
    console.log('   Message ID:', data[0].id);
    console.log('   Created at:', data[0].created_at || 'N/A');
    console.log('\n✅ Database submission is working correctly!\n');
    
    // Clean up test message (optional)
    console.log('🧹 Cleaning up test message...');
    await supabase
      .from('contact_messages')
      .delete()
      .eq('id', data[0].id);
    console.log('✅ Test message removed\n');
    
    return true;
  } catch (error) {
    console.error('❌ Insert error:', error.message);
    return false;
  }
}

async function runTests() {
  const tableExists = await testDatabaseConnection();
  
  if (!tableExists) {
    console.log('\n⚠️  Please create the table in Supabase first, then run this test again.');
    process.exit(1);
  }
  
  const insertWorks = await testInsert();
  
  if (insertWorks) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ ALL TESTS PASSED!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYour contact form will save messages to Supabase successfully!');
    console.log('You can view messages in your admin dashboard or Supabase dashboard.\n');
    process.exit(0);
  } else {
    console.log('\n❌ Tests failed. Please check the errors above.');
    process.exit(1);
  }
}

runTests();


