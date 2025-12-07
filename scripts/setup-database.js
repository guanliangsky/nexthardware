// Script to setup database via Supabase client
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read SQL file
const sqlFile = path.join(__dirname, '../run-database-setup.sql');
const sql = fs.readFileSync(sqlFile, 'utf8');

// Split into individual statements
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

async function executeSQL() {
  console.log('🚀 Setting up community_members table...\n');
  
  // Since Supabase JS client doesn't support raw SQL, we'll use the REST API
  // But first, let's try to create the table using direct inserts/queries
  
  try {
    // Try to query the table to see if it exists
    const { error: checkError } = await supabase
      .from('community_members')
      .select('id')
      .limit(1);
    
    if (checkError && checkError.code === 'PGRST116') {
      console.log('📝 Table does not exist, creating...');
      // Table doesn't exist, we need to create it via SQL
      console.log('⚠️  Supabase JS client cannot execute DDL statements.');
      console.log('📋 Please run the SQL manually in Supabase Dashboard:\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(sql);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('📍 Or visit: https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/editor');
      process.exit(1);
    } else if (!checkError) {
      console.log('✅ Table community_members already exists!');
      console.log('🔍 Checking if password_hash column exists...');
      
      // Try to query password_hash to see if column exists
      const { error: colError } = await supabase
        .from('community_members')
        .select('password_hash')
        .limit(1);
      
      if (colError && colError.message.includes('password_hash')) {
        console.log('⚠️  password_hash column missing. Adding it...');
        console.log('📋 Please run this SQL in Supabase Dashboard:');
        console.log('   ALTER TABLE community_members ADD COLUMN IF NOT EXISTS password_hash TEXT;');
      } else {
        console.log('✅ All columns exist!');
      }
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('\n📋 Please run the SQL manually in Supabase Dashboard SQL Editor');
    process.exit(1);
  }
}

executeSQL();


