// Quick script to add password_hash column via API check
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAndAdd() {
  console.log('Checking community_members table...');
  
  // Try to query password_hash column
  const { error } = await supabase
    .from('community_members')
    .select('password_hash')
    .limit(1);
  
  if (error) {
    if (error.message.includes('password_hash') || error.message.includes('column')) {
      console.log('❌ password_hash column is missing!');
      console.log('📋 Please run this SQL in Supabase Dashboard:');
      console.log('   ALTER TABLE community_members ADD COLUMN IF NOT EXISTS password_hash TEXT;');
      console.log('\n📍 https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/editor');
    } else {
      console.log('Error:', error.message);
    }
  } else {
    console.log('✅ password_hash column exists!');
    console.log('✅ Table is ready for registration!');
  }
}

checkAndAdd();


