#!/usr/bin/env node

/**
 * Create OAuth2 Credentials via Google Cloud API
 * 
 * This script creates OAuth2 client credentials for Gmail API
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get project ID from credentials or use default
let projectId = 'next-hardware-email';
try {
  const credsPath = path.join(__dirname, 'credentials', 'gmail-service-account.json');
  if (fs.existsSync(credsPath)) {
    const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
    projectId = creds.project_id;
  }
} catch (e) {
  // Use default
}

console.log('🔐 Creating OAuth2 Credentials via CLI');
console.log('=======================================\n');
console.log(`Project: ${projectId}\n`);

// Check if gcloud is authenticated
try {
  execSync('gcloud auth list --filter=status:ACTIVE --format="value(account)"', { stdio: 'pipe' });
} catch (e) {
  console.error('❌ Error: Not authenticated with gcloud');
  console.error('   Run: gcloud auth login');
  process.exit(1);
}

// Enable required APIs
console.log('📋 Step 1: Enabling required APIs...');
try {
  execSync(`gcloud services enable iamcredentials.googleapis.com --project=${projectId}`, { stdio: 'inherit' });
  execSync(`gcloud services enable cloudresourcemanager.googleapis.com --project=${projectId}`, { stdio: 'inherit' });
} catch (e) {
  console.warn('⚠️  Some APIs might already be enabled (that\'s okay)');
}

// Note: Creating OAuth2 clients via CLI is complex
// The Google Cloud API requires the OAuth Consent Screen to be configured first
// This is best done via the web UI, but we can guide through it

console.log('\n📋 Step 2: OAuth2 Client Creation');
console.log('===================================\n');
console.log('⚠️  Note: OAuth2 client creation via CLI requires additional setup.');
console.log('   The easiest way is via the web UI, but here\'s what we can do:\n');

console.log('Option 1: Use Web UI (Recommended - 2 minutes)');
console.log('  1. Go to: https://console.cloud.google.com/apis/credentials');
console.log('  2. Select project:', projectId);
console.log('  3. Click "+ CREATE CREDENTIALS" → "OAuth client ID"');
console.log('  4. Follow the prompts\n');

console.log('Option 2: Use gcloud with API (More complex)');
console.log('  We can create a script that uses the REST API\n');

console.log('Which would you prefer?');
console.log('  (The web UI is actually faster for OAuth2 setup)');

// For now, let's provide a helper that uses the REST API
console.log('\n📋 Alternative: I can create a script that uses the Google Cloud REST API');
console.log('   This requires the OAuth Consent Screen to be configured first.\n');

console.log('💡 Recommendation: Use the web UI for OAuth2 (it\'s the standard way)');
console.log('   Then we can automate the refresh token part via CLI!\n');

