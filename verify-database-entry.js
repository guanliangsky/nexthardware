// Quick script to verify database entry via API
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyEntries() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  🔍 VERIFYING DATABASE ENTRIES                            ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');
  
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (error) {
      console.error('❌ Database Error:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('⚠️  No contact messages found in database');
      console.log('');
      console.log('This could mean:');
      console.log('1. No submissions yet');
      console.log('2. Database table not created');
      console.log('3. Connection issue');
      return;
    }
    
    console.log(`✅ Found ${data.length} contact message(s):`);
    console.log('');
    
    data.forEach((entry, index) => {
      console.log(`📧 Entry #${index + 1}:`);
      console.log(`   ID: ${entry.id}`);
      console.log(`   Name: ${entry.name}`);
      console.log(`   Email: ${entry.email}`);
      console.log(`   Subject: ${entry.subject || '(no subject)'}`);
      console.log(`   Message: ${entry.message.substring(0, 60)}${entry.message.length > 60 ? '...' : ''}`);
      console.log(`   Created: ${new Date(entry.created_at).toLocaleString()}`);
      console.log(`   Read: ${entry.read ? 'Yes' : 'No'}`);
      console.log('');
    });
    
    // Check for our test entry
    const testEntry = data.find(e => e.email.includes('test.contact'));
    if (testEntry) {
      console.log('✅ Test entry found!');
      console.log(`   Email: ${testEntry.email}`);
      console.log(`   Created: ${new Date(testEntry.created_at).toLocaleString()}`);
    } else {
      console.log('⚠️  Test entry not found in recent entries');
      console.log('   (It might be older or not saved)');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

verifyEntries();

