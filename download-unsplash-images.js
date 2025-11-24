#!/usr/bin/env node

/**
 * Download Unsplash Images to Local Directory
 * Downloads all images used in the website to public/images/
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Image URLs to download
const imagesToDownload = {
  community: [
    {
      name: 'edge-ai-robotics-controller.jpg',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop',
    },
    {
      name: 'ar-glasses-prototype.jpg',
      url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&fit=crop',
    },
    {
      name: 'hackathon-2024.jpg',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&fit=crop',
    },
    {
      name: 'silicon-workshop.jpg',
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80&fit=crop',
    },
  ],
  profiles: [
    {
      name: 'sarah-chen.jpg',
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=crop&crop=face',
    },
    {
      name: 'michael-zhang.jpg',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face',
    },
    {
      name: 'emily-rodriguez.jpg',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fit=crop&crop=face',
    },
    {
      name: 'alex-kim.jpg',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop&crop=face',
    },
    {
      name: 'jordan-lee.jpg',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face',
    },
    {
      name: 'taylor-park.jpg',
      url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fit=crop&crop=face',
    },
    {
      name: 'casey-wong.jpg',
      url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&fit=crop&crop=face',
    },
    {
      name: 'priya-patel.jpg',
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fit=crop&crop=face',
    },
  ],
  projects: [
    {
      name: 'autonomous-drone-controller.jpg',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop',
    },
    {
      name: 'ar-glasses-spatial.jpg',
      url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&fit=crop',
    },
    {
      name: 'neuromorphic-chip.jpg',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80&fit=crop',
    },
  ],
};

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(filePath);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close();
        fs.unlinkSync(filePath);
        downloadImage(response.headers.location, filePath).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(filePath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('📥 Downloading Unsplash Images to Local Directory\n');
  console.log('='.repeat(70));
  
  // Create directories
  const dirs = [
    'public/images/community',
    'public/images/profiles',
    'public/images/projects',
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
  
  console.log('');
  
  let total = 0;
  let success = 0;
  let failed = 0;
  
  // Download community images
  console.log('📁 Community Images (4 images)...');
  for (const img of imagesToDownload.community) {
    total++;
    const filePath = path.join('public/images/community', img.name);
    try {
      await downloadImage(img.url, filePath);
      console.log(`   ✅ ${img.name}`);
      success++;
    } catch (error) {
      console.log(`   ❌ ${img.name} - ${error.message}`);
      failed++;
    }
  }
  
  console.log('');
  
  // Download profile images
  console.log('👤 Profile Images (8 images)...');
  for (const img of imagesToDownload.profiles) {
    total++;
    const filePath = path.join('public/images/profiles', img.name);
    try {
      await downloadImage(img.url, filePath);
      console.log(`   ✅ ${img.name}`);
      success++;
    } catch (error) {
      console.log(`   ❌ ${img.name} - ${error.message}`);
      failed++;
    }
  }
  
  console.log('');
  
  // Download project images
  console.log('🚀 Project Images (3 images)...');
  for (const img of imagesToDownload.projects) {
    total++;
    const filePath = path.join('public/images/projects', img.name);
    try {
      await downloadImage(img.url, filePath);
      console.log(`   ✅ ${img.name}`);
      success++;
    } catch (error) {
      console.log(`   ❌ ${img.name} - ${error.message}`);
      failed++;
    }
  }
  
  console.log('');
  console.log('='.repeat(70));
  console.log(`\n📊 Summary:`);
  console.log(`   Total: ${total} images`);
  console.log(`   ✅ Success: ${success}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log('');
  
  if (success > 0) {
    console.log('✅ Images downloaded successfully!');
    console.log('📝 Next step: Update components to use local paths');
    console.log('   (I can do this automatically - just ask!)');
  }
  
  if (failed > 0) {
    console.log('⚠️  Some images failed to download. You may need to:');
    console.log('   1. Check your internet connection');
    console.log('   2. Try running the script again');
    console.log('   3. Manually download failed images');
  }
  
  console.log('');
}

// Run the download
downloadAllImages().catch(console.error);

