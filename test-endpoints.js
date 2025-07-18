#!/usr/bin/env node

import fs from 'fs';

const baseUrl = 'http://localhost:3000';

const endpoints = [
    '/',
    '/pwa-test.html',
    '/manifest.json',
    '/sw.js',
    '/styles.css',
    '/script.js',
    '/favicon.svg',
    '/robots.txt',
    '/sitemap.xml',
    '/icons/icon-192x192.svg',
    '/icons/icon-512x512.svg'
];

console.log('🧪 Testing PWA Endpoints...\n');

async function testEndpoints() {
    let allPassed = true;
    
    for (const endpoint of endpoints) {
        try {
            const response = await fetch(baseUrl + endpoint);
            
            if (response.ok) {
                const contentType = response.headers.get('content-type') || 'unknown';
                console.log(`✅ ${endpoint} - ${response.status} (${contentType})`);
            } else {
                console.log(`❌ ${endpoint} - ${response.status} ${response.statusText}`);
                allPassed = false;
            }
        } catch (error) {
            console.log(`❌ ${endpoint} - ERROR: ${error.message}`);
            allPassed = false;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    
    if (allPassed) {
        console.log('🎉 All PWA endpoints are working!');
        console.log('\n📱 Ready to test PWA installation:');
        console.log('1. Open Chrome on Android');
        console.log('2. Visit: http://localhost:3000');
        console.log('3. Wait for install banner');
        console.log('4. Tap "Install" to add to home screen');
        console.log('\n🔗 Testing URLs:');
        console.log(`• Main App: ${baseUrl}`);
        console.log(`• PWA Test: ${baseUrl}/pwa-test.html`);
        console.log(`• Manifest: ${baseUrl}/manifest.json`);
    } else {
        console.log('❌ Some endpoints are not working. Please check the server configuration.');
    }
}

// Test if server is running
async function checkServer() {
    try {
        const response = await fetch(baseUrl);
        if (response.ok) {
            console.log('✅ Server is running on http://localhost:3000\n');
            await testEndpoints();
        } else {
            console.log('❌ Server is not responding properly');
        }
    } catch (error) {
        console.log('❌ Server is not running. Please start with: npm run dev');
        console.log(`Error: ${error.message}`);
    }
}

checkServer();
