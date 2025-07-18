# 🚀 CodeToPrint - Universal Code Formatter PWA

<div align="center">
  <img src="public/icons/icon-192x192.svg" width="120" height="120" alt="CodeToPrint Logo">
  
  **Progressive Web App untuk format dan print kode dari berbagai bahasa pemrograman**
  
  [![PWA Ready](https://img.shields.io/badge/PWA-Ready-brightgreen.svg)](https://web.dev/progressive-web-apps/)
  [![Install on Android](https://img.shields.io/badge/Install-Android-green.svg)](https://developers.google.com/web/fundamentals/app-install-banners/)
  [![Offline Support](https://img.shields.io/badge/Offline-Supported-blue.svg)](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)
</div>

## ✨ Fitur PWA

### 📱 **Installable App**
- **Install di Android**: Tap banner install atau "Add to Home Screen"
- **Install di Desktop**: Chrome akan menampilkan install prompt
- **App Icon**: Muncul di home screen seperti aplikasi native
- **Splash Screen**: Loading screen yang menarik saat membuka app

### 🔌 **Offline Support**
- **Service Worker**: Caching otomatis untuk akses offline
- **Cache Strategy**: Cache-first untuk assets, network-first untuk data
- **Offline Indicator**: Notifikasi saat mode offline
- **Background Sync**: Sync data saat koneksi kembali

### ⚡ **Enhanced Performance**
- **Fast Loading**: Preload dan cache assets penting
- **Progressive Enhancement**: Berfungsi di semua browser
- **Responsive**: Optimal di mobile, tablet, dan desktop
- **Lighthouse Score**: 90+ di semua kategori

### 🎯 **Native-like Features**
- **App Shortcuts**: Quick actions dari home screen
- **Theme Colors**: Sesuai dengan sistem operasi
- **Fullscreen Mode**: Mode fullscreen untuk editing
- **Touch Optimized**: Gesture dan touch yang responsive

## 🚦 Quick Start

### 1. **Development Mode**
```bash
# Clone dan install
git clone https://github.com/Youthis321/code-formater.git
cd code-formater
npm install

# Generate PWA icons
npm run pwa:icons

# Start development server
npm run dev

# Test PWA features
npm run pwa:test
```

### 2. **Test PWA di Browser**
```bash
# Buka di Chrome
http://localhost:3000

# Test PWA functionality
http://localhost:3000/pwa-test.html
```

### 3. **Install di Android**
1. Buka Chrome di Android
2. Kunjungi `http://localhost:3000` (atau URL production)
3. Tunggu banner install muncul
4. Tap "Install" atau "Add to Home Screen"
5. App akan muncul di home screen

## 📋 PWA Testing Checklist

### ✅ **Core PWA Requirements**
- [x] **HTTPS**: Required untuk production (localhost OK untuk dev)
- [x] **Web App Manifest**: `/manifest.json` dengan metadata lengkap
- [x] **Service Worker**: `/sw.js` untuk caching dan offline
- [x] **Icons**: Berbagai ukuran (72px - 512px)
- [x] **Responsive**: Mobile-first design

### ✅ **Enhanced Features**
- [x] **Install Prompt**: Automatic dan manual install
- [x] **Update Notifications**: Notifikasi saat ada update
- [x] **Offline Functionality**: Bekerja tanpa internet
- [x] **Cache Management**: Smart caching strategy
- [x] **App Shortcuts**: Quick actions
- [x] **Splash Screen**: Custom loading screen
- [x] **Theme Integration**: OS theme support

### ✅ **Testing Tools**
- [x] **DevTools Audit**: Chrome Lighthouse PWA audit
- [x] **PWA Test Page**: Custom testing interface
- [x] **Service Worker Debug**: Console debugging tools
- [x] **Cache Inspector**: Cache storage analysis

## 🛠️ PWA Development

### **File Structure**
```
public/
├── index.html          # Main app dengan PWA meta tags
├── manifest.json       # PWA manifest file
├── sw.js              # Service worker
├── styles.css         # CSS dengan PWA styling
├── script.js          # App logic dengan PWA features
├── pwa-test.html      # PWA testing interface
├── robots.txt         # SEO optimization
├── sitemap.xml        # SEO sitemap
└── icons/             # PWA icons
    ├── icon-*.svg     # App icons (berbagai ukuran)
    ├── shortcut-*.svg # Shortcut icons
    └── favicon.svg    # Browser favicon
```

### **Service Worker Features**
- **Cache Strategy**: Stale-while-revalidate untuk optimal performance
- **Asset Caching**: CDN resources (Prism.js, Ace Editor, etc.)
- **Dynamic Caching**: User content dan API responses
- **Background Sync**: Sync saat online kembali
- **Update Management**: Automatic update detection

### **Manifest Configuration**
```json
{
  "name": "CodeToPrint - Universal Code Formatter",
  "short_name": "CodeToPrint",
  "display": "standalone",
  "start_url": "/",
  "background_color": "#1a202c",
  "theme_color": "#667eea",
  "icons": [
    // Various sizes for different devices
  ],
  "shortcuts": [
    // Quick actions from home screen
  ]
}
```

## 📱 Android Integration

### **WebView Integration**
```kotlin
// Basic WebView setup
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    cacheMode = WebSettings.LOAD_DEFAULT
    setAppCacheEnabled(true)
}

webView.loadUrl("https://your-domain.com")
```

### **Enhanced WebView**
```kotlin
// dengan PWA features
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    databaseEnabled = true
    allowFileAccess = true
    allowContentAccess = true
}

// Custom WebViewClient untuk PWA
webView.webViewClient = CustomWebViewClient()
```

## 🎯 Performance Optimization

### **Lighthouse Scores Target**
- **Performance**: 90+ (Fast loading dan rendering)
- **Accessibility**: 90+ (Screen reader dan keyboard friendly)
- **Best Practices**: 90+ (Security dan modern standards)
- **SEO**: 90+ (Search engine optimization)
- **PWA**: 90+ (Progressive Web App standards)

### **Core Web Vitals**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### **PWA Metrics**
- **Install Rate**: 10-30% dari unique visitors
- **Return Visit Rate**: 50-80% untuk installed users
- **Offline Usage**: 5-15% dari total usage
- **App Store Rating**: 4.0+ untuk user experience

## 🚀 Production Deployment

### **Vercel (Recommended)**
```bash
# Deploy dengan PWA optimizations
npm run deploy

# Preview deployment
npm run deploy:preview
```

### **Manual Server Setup**
1. **HTTPS Required**: PWA memerlukan HTTPS
2. **Proper MIME Types**: Configure server untuk `.webmanifest`, `.svg`
3. **Cache Headers**: Optimize caching untuk performance
4. **Security Headers**: CSP, HSTS, dll.

### **Environment Variables**
```env
# Production settings
NODE_ENV=production
PWA_CACHE_VERSION=1.2.0
```

## 🔧 Debugging & Troubleshooting

### **PWA Debug Commands**
```javascript
// Service Worker status
navigator.serviceWorker.getRegistrations()

// Cache inspection
caches.keys()

// Manual install prompt
window.deferredPrompt?.prompt()

// Clear all data
caches.keys().then(names => 
  Promise.all(names.map(name => caches.delete(name)))
)
```

### **Common Issues**

#### **Install Prompt tidak muncul**
- ✅ Check HTTPS (localhost OK untuk dev)
- ✅ Verify manifest.json accessible
- ✅ Confirm service worker registered
- ✅ Wait 5+ seconds after first visit
- ✅ Check browser install criteria

#### **Service Worker Error**
- ✅ Check console untuk error messages
- ✅ Verify `/sw.js` accessible
- ✅ Check scope configuration
- ✅ Clear browser cache
- ✅ Test di incognito mode

#### **Offline tidak bekerja**
- ✅ Check service worker caching
- ✅ Verify cache names consistency
- ✅ Test fetch event handler
- ✅ Use DevTools offline simulation

## 📊 Analytics & Monitoring

### **PWA Performance Tracking**
- **Install Events**: Track install prompt acceptance
- **Offline Usage**: Monitor offline functionality usage
- **Cache Hit Rates**: Analyze cache effectiveness
- **Update Success**: Track update notification success

### **User Experience Metrics**
- **Time to Interactive**: Measure app responsiveness
- **Bounce Rate**: Compare web vs installed app
- **Session Duration**: Installed vs browser usage
- **Feature Usage**: Track PWA-specific features

## 🤝 Contributing

### **Development Setup**
1. Fork repository
2. Install dependencies: `npm install`
3. Generate icons: `npm run pwa:icons`
4. Start dev server: `npm run dev`
5. Test PWA: `npm run pwa:test`

### **PWA Testing Guidelines**
- Test di berbagai devices (mobile, tablet, desktop)
- Verify offline functionality
- Check install/update flows
- Validate Lighthouse scores
- Test performance metrics

## 📄 License

MIT License - feel free to use untuk projects lain!

## 🙏 Credits

- **Prism.js**: Syntax highlighting
- **Ace Editor**: Advanced code editing
- **html2canvas**: Screenshot functionality
- **JetBrains Mono**: Code font
- **PWA Best Practices**: Google Web.dev guides

---

<div align="center">
  
  **🚀 Ready untuk install di Android! 📱**
  
  [Live Demo](https://your-domain.vercel.app) • [PWA Test](https://your-domain.vercel.app/pwa-test.html) • [Documentation](./PWA-GUIDE.md)
  
</div>
