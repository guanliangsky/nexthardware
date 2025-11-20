#!/usr/bin/env node

/**
 * Configure DNS records in Porkbun for nexthardware.io
 * 
 * First, get your API keys from: https://porkbun.com/account/api
 * Then set environment variables:
 * export PORKBUN_API_KEY="your_api_key"
 * export PORKBUN_API_SECRET="your_secret_key"
 * 
 * Then run: node configure-porkbun-dns.js
 */

const https = require('https');

const API_KEY = process.env.PORKBUN_API_KEY;
const API_SECRET = process.env.PORKBUN_API_SECRET;
const DOMAIN = 'nexthardware.io';

if (!API_KEY || !API_SECRET) {
  console.error('❌ Error: Missing API credentials!');
  console.error('Get your API keys from: https://porkbun.com/account/api');
  console.error('Then set:');
  console.error('  export PORKBUN_API_KEY="your_key"');
  console.error('  export PORKBUN_API_SECRET="your_secret"');
  process.exit(1);
}

// Vercel DNS records
const dnsRecords = [
  {
    name: '@',  // Root domain
    type: 'A',
    content: '76.76.21.21',
    ttl: 600
  },
  {
    name: 'www',
    type: 'CNAME',
    content: 'cname.vercel-dns.com',
    ttl: 600
  }
];

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    
    const options = {
      hostname: 'porkbun.com',
      path: `/api/json/v3${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData ? Buffer.byteLength(postData) : 0
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function configureDNS() {
  console.log('🔧 Configuring DNS for nexthardware.io...\n');

  try {
    // First, get existing records to see what we're working with
    console.log('📋 Fetching existing DNS records...');
    const existing = await makeRequest(`/dns/retrieve/${DOMAIN}`, 'POST', {
      apikey: API_KEY,
      secretapikey: API_SECRET
    });

    if (existing.status !== 'SUCCESS') {
      throw new Error(`Failed to fetch records: ${existing.message}`);
    }

    console.log(`Found ${existing.records?.length || 0} existing records\n`);

    // Delete existing A and CNAME records that might conflict
    if (existing.records) {
      const toDelete = existing.records.filter(r => 
        (r.type === 'A' && (r.name === '@' || r.name === '')) ||
        (r.type === 'CNAME' && r.name === 'www')
      );

      for (const record of toDelete) {
        console.log(`🗑️  Deleting existing ${record.type} record for ${record.name || '@'}...`);
        const deleteResult = await makeRequest(`/dns/delete/${DOMAIN}/${record.id}`, 'POST', {
          apikey: API_KEY,
          secretapikey: API_SECRET
        });
        if (deleteResult.status === 'SUCCESS') {
          console.log(`   ✅ Deleted\n`);
        }
      }
    }

    // Add new records
    console.log('➕ Adding Vercel DNS records...\n');
    for (const record of dnsRecords) {
      console.log(`   Adding ${record.type} record: ${record.name || '@'} → ${record.content}`);
      const result = await makeRequest(`/dns/create/${DOMAIN}`, 'POST', {
        apikey: API_KEY,
        secretapikey: API_SECRET,
        name: record.name === '@' ? '' : record.name,
        type: record.type,
        content: record.content,
        ttl: record.ttl
      });

      if (result.status === 'SUCCESS') {
        console.log(`   ✅ Added successfully\n`);
      } else {
        console.error(`   ❌ Failed: ${result.message}\n`);
      }
    }

    console.log('✅ DNS configuration complete!');
    console.log('\n⏳ DNS changes may take 5-10 minutes to propagate.');
    console.log('🌐 Check status: https://dnschecker.org/#A/nexthardware.io');
    console.log('🔗 Your site: https://nexthardware.io');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

configureDNS();

