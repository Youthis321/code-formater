#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple SVG icon generator for PWA
function generateSVGIcon(size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.1}" ry="${size * 0.1}" fill="url(#bg)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.6}" fill="white" text-anchor="middle" dominant-baseline="central">🚀</text>
</svg>`;
}

// Create icons directory
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons for different sizes
const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
    const svgContent = generateSVGIcon(size);
    const filename = `icon-${size}x${size}.svg`;
    const filepath = path.join(iconsDir, filename);
    
    fs.writeFileSync(filepath, svgContent);
    console.log(`✅ Generated ${filename}`);
});

// Create favicon.ico placeholder
const faviconContent = generateSVGIcon(32);
fs.writeFileSync(path.join(__dirname, 'public', 'favicon.svg'), faviconContent);
console.log('✅ Generated favicon.svg');

// Create apple-touch-icon
const appleTouchIcon = generateSVGIcon(180);
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.svg'), appleTouchIcon);
console.log('✅ Generated apple-touch-icon.svg');

// Create shortcut icons
const shortcutFormat = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="96" height="96" rx="9.6" ry="9.6" fill="url(#bg)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dominant-baseline="central">🎯</text>
</svg>`;

const shortcutNew = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="96" height="96" rx="9.6" ry="9.6" fill="url(#bg)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dominant-baseline="central">✨</text>
</svg>`;

fs.writeFileSync(path.join(iconsDir, 'shortcut-format.svg'), shortcutFormat);
fs.writeFileSync(path.join(iconsDir, 'shortcut-new.svg'), shortcutNew);
console.log('✅ Generated shortcut icons');

console.log('\n🎉 All PWA icons generated successfully!');
console.log('\n📝 Note: SVG icons are being used as placeholders.');
console.log('   For production, consider converting to PNG format for better compatibility.');
console.log('\n🔧 To convert SVG to PNG, you can use online tools or imagemagick:');
console.log('   convert icon.svg icon.png');
