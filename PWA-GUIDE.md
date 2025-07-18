# PWA Debug Tools for CodeToPrint

## Install di Android

### Melalui Chrome Browser:
1. Buka Chrome di Android
2. Kunjungi: `http://localhost:3000` atau URL production
3. Tunggu banner install muncul (atau tap menu ⋮ > "Add to Home screen")
4. Tap "Install" atau "Add to Home screen"
5. App akan muncul di home screen

### Manual Install:
1. Buka Chrome > Settings > Site Settings
2. Cari CodeToPrint
3. Tap "Add to Home screen"

## PWA Features Checklist

### ✅ Core Requirements:
- [x] HTTPS (untuk production)
- [x] Web App Manifest (`/manifest.json`)
- [x] Service Worker (`/sw.js`)
- [x] Icons (berbagai ukuran)
- [x] Responsive design

### ✅ Enhanced Features:
- [x] Offline functionality
- [x] Install prompt
- [x] Update notifications
- [x] Cache management
- [x] Splash screen
- [x] Shortcuts
- [x] Theme colors

## Testing

### Test PWA:
```bash
# Jalankan server
npm run dev

# Buka browser dan test:
# 1. http://localhost:3000 - Main app
# 2. http://localhost:3000/pwa-test.html - PWA test page
```

### Browser DevTools:
1. Buka DevTools (F12)
2. Tab "Application"
3. Check:
   - Manifest
   - Service Workers
   - Storage > Cache Storage
   - Storage > Local Storage

### Lighthouse Audit:
1. DevTools > Lighthouse
2. Run "Progressive Web App" audit
3. Target score: 90+

## Production Deployment

### Vercel:
```bash
# Deploy ke Vercel (sudah PWA-ready)
vercel --prod
```

### Manual Server:
1. Serve dengan HTTPS
2. Configure cache headers (lihat nginx-pwa.conf)
3. Set proper MIME types:
   - `.webmanifest` → `application/manifest+json`
   - `.svg` → `image/svg+xml`

## Android WebView Integration

### Basic WebView:
```kotlin
// MainActivity.kt
class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.cacheMode = WebSettings.LOAD_DEFAULT
        
        webView.loadUrl("https://your-domain.com")
        setContentView(webView)
    }
}
```

### Enhanced WebView:
```kotlin
// dengan PWA features
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    databaseEnabled = true
    cacheMode = WebSettings.LOAD_DEFAULT
    setAppCacheEnabled(true)
    allowFileAccess = true
    allowContentAccess = true
}

webView.webViewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
        view?.loadUrl(url ?: "")
        return true
    }
}
```

## Debug Commands

### Service Worker:
```javascript
// Di Console browser
navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('SW Registrations:', registrations);
});

// Clear semua SW
navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
});
```

### Cache Storage:
```javascript
// List caches
caches.keys().then(cacheNames => {
    console.log('Caches:', cacheNames);
});

// Clear cache
caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(name => caches.delete(name)));
});
```

### Install Prompt:
```javascript
// Trigger manual install
if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
}
```

## File Structure

```
public/
├── index.html          # Main app with PWA meta tags
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── styles.css         # CSS with PWA styles
├── script.js          # Main app logic
├── pwa-test.html      # PWA testing page
├── favicon.svg        # Favicon
└── icons/             # PWA icons
    ├── icon-*.svg     # Various sizes
    ├── shortcut-*.svg # Shortcut icons
    └── apple-touch-icon.svg
```

## Troubleshooting

### Install Banner tidak muncul:
1. Check HTTPS (localhost OK untuk testing)
2. Check manifest.json valid
3. Check service worker registered
4. Wait 5+ seconds after first visit
5. Check tidak ada banner yang di-dismiss sebelumnya

### Service Worker tidak bekerja:
1. Check console errors
2. Verify SW file accessible di `/sw.js`
3. Check HTTPS requirement
4. Clear browser cache
5. Check scope configuration

### App tidak offline:
1. Check service worker caching
2. Verify cache names match
3. Check fetch event handler
4. Test with DevTools offline mode

### Icon tidak muncul:
1. Check icon file accessible
2. Verify manifest.json icon paths
3. Check proper MIME types
4. Test different sizes

## Metrics untuk PWA Success

### Lighthouse Scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- PWA: 90+

### Core Web Vitals:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### PWA Specific:
- Install rate: 10-30%
- Return visit rate: 50-80%
- Offline usage: 5-15%
- App-like experience rating: 4+/5
