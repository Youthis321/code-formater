#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 PWA Deployment Checklist\n');

// Check files exist
const requiredFiles = [
    'public/index.html',
    'public/manifest.json',
    'public/sw.js',
    'public/styles.css',
    'public/script.js',
    'public/robots.txt',
    'public/sitemap.xml',
    'public/favicon.svg'
];

console.log('📂 Checking required files:');
let allFilesExist = true;

requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.log(`  ❌ ${file} - MISSING!`);
        allFilesExist = false;
    }
});

// Check icons
console.log('\n🎨 Checking PWA icons:');
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
let allIconsExist = true;

iconSizes.forEach(size => {
    const iconPath = path.join(__dirname, `public/icons/icon-${size}x${size}.svg`);
    if (fs.existsSync(iconPath)) {
        console.log(`  ✅ icon-${size}x${size}.svg`);
    } else {
        console.log(`  ❌ icon-${size}x${size}.svg - MISSING!`);
        allIconsExist = false;
    }
});

// Check manifest.json content
console.log('\n📱 Checking manifest.json:');
try {
    const manifestPath = path.join(__dirname, 'public/manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'background_color', 'theme_color', 'icons'];
    requiredFields.forEach(field => {
        if (manifest[field]) {
            console.log(`  ✅ ${field}: ${JSON.stringify(manifest[field]).substring(0, 50)}...`);
        } else {
            console.log(`  ❌ ${field} - MISSING!`);
            allFilesExist = false;
        }
    });
    
    if (manifest.icons && manifest.icons.length > 0) {
        console.log(`  ✅ Icons count: ${manifest.icons.length}`);
    } else {
        console.log(`  ❌ No icons defined in manifest!`);
        allFilesExist = false;
    }
    
} catch (error) {
    console.log(`  ❌ Error reading manifest.json: ${error.message}`);
    allFilesExist = false;
}

// Check service worker content
console.log('\n⚙️ Checking service worker:');
try {
    const swPath = path.join(__dirname, 'public/sw.js');
    const swContent = fs.readFileSync(swPath, 'utf8');
    
    const swChecks = [
        { check: 'CACHE_NAME', pattern: /CACHE_NAME.*=.*['"]/i },
        { check: 'install event', pattern: /addEventListener\(['"]install['"]/ },
        { check: 'activate event', pattern: /addEventListener\(['"]activate['"]/ },
        { check: 'fetch event', pattern: /addEventListener\(['"]fetch['"]/ },
        { check: 'caches.open', pattern: /caches\.open/ },
        { check: 'cache.addAll', pattern: /cache\.addAll/ }
    ];
    
    swChecks.forEach(({ check, pattern }) => {
        if (pattern.test(swContent)) {
            console.log(`  ✅ ${check}`);
        } else {
            console.log(`  ❌ ${check} - NOT FOUND!`);
            allFilesExist = false;
        }
    });
    
} catch (error) {
    console.log(`  ❌ Error reading sw.js: ${error.message}`);
    allFilesExist = false;
}

// Check HTML for PWA meta tags
console.log('\n🌐 Checking HTML PWA tags:');
try {
    const htmlPath = path.join(__dirname, 'public/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    const htmlChecks = [
        { check: 'viewport meta', pattern: /<meta.*name=["']viewport["']/ },
        { check: 'theme-color', pattern: /<meta.*name=["']theme-color["']/ },
        { check: 'manifest link', pattern: /<link.*rel=["']manifest["']/ },
        { check: 'apple-mobile-web-app', pattern: /<meta.*apple-mobile-web-app/ },
        { check: 'PWA install banner', pattern: /pwaInstallBanner/ },
        { check: 'service worker registration', pattern: /serviceWorker\.register/ }
    ];
    
    htmlChecks.forEach(({ check, pattern }) => {
        if (pattern.test(htmlContent)) {
            console.log(`  ✅ ${check}`);
        } else {
            console.log(`  ❌ ${check} - NOT FOUND!`);
            allFilesExist = false;
        }
    });
    
} catch (error) {
    console.log(`  ❌ Error reading index.html: ${error.message}`);
    allFilesExist = false;
}

// Final result
console.log('\n' + '='.repeat(50));
if (allFilesExist && allIconsExist) {
    console.log('🎉 PWA READY FOR DEPLOYMENT!');
    console.log('\n📋 Next steps:');
    console.log('1. npm run deploy');
    console.log('2. Test di Chrome mobile');
    console.log('3. Check Lighthouse PWA score');
    console.log('4. Test install prompt');
    console.log('5. Verify offline functionality');
    
    console.log('\n🔗 Testing URLs:');
    console.log('• Main app: https://your-domain.vercel.app');
    console.log('• PWA test: https://your-domain.vercel.app/pwa-test.html');
    console.log('• Manifest: https://your-domain.vercel.app/manifest.json');
    
} else {
    console.log('❌ PWA NOT READY - Please fix the issues above');
    process.exit(1);
}

console.log('\n💡 PWA Features included:');
console.log('• 📱 Installable on Android & Desktop');
console.log('• 🔌 Offline support with Service Worker');
console.log('• ⚡ Fast loading with caching');
console.log('• 🎯 App shortcuts');
console.log('• 🎨 Custom splash screen');
console.log('• 📊 Update notifications');
console.log('• 🔄 Background sync');
console.log('• 🌓 Theme color integration');

console.log('\n🚀 Ready to be a native-like app on Android!');
