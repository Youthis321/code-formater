const CACHE_NAME = 'codetoprint-v1.2.0';
const STATIC_CACHE = 'codetoprint-static-v1.2.0';
const DYNAMIC_CACHE = 'codetoprint-dynamic-v1.2.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  // Prism.js CDN files
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-dark.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-tsx.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-php.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-cpp.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-csharp.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css',
  // Ace Editor CDN files
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/ace.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-python.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-javascript.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-typescript.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-html.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-css.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-java.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-json.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-php.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-c_cpp.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/theme-github.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/theme-monokai.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/ext-language_tools.js',
  // html2canvas CDN
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  // Google Fonts
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('📦 Caching static files...');
      return cache.addAll(STATIC_FILES.map(url => {
        // Handle relative URLs
        if (url.startsWith('/')) {
          return new Request(url, { cache: 'reload' });
        }
        return new Request(url, { 
          cache: 'reload',
          mode: 'cors'
        });
      })).catch(error => {
        console.error('❌ Failed to cache some files:', error);
        // Don't fail the installation if some files can't be cached
        return Promise.resolve();
      });
    }).then(() => {
      console.log('✅ Static files cached successfully');
      self.skipWaiting(); // Force activation
    })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated');
      return self.clients.claim(); // Take control immediately
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and non-http(s) URLs
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('📋 Serving from cache:', request.url);
        return cachedResponse;
      }
      
      // Not in cache, fetch from network
      return fetch(request).then((networkResponse) => {
        // Don't cache non-successful responses
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        
        // Clone the response before caching
        const responseToCache = networkResponse.clone();
        
        // Cache dynamic content
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseToCache);
          console.log('💾 Cached dynamic content:', request.url);
        });
        
        return networkResponse;
      }).catch((error) => {
        console.error('🌐 Network fetch failed:', error);
        
        // Return offline fallback for HTML requests
        if (request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
        
        // For other requests, just fail
        throw error;
      });
    })
  );
});

// Handle background sync (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    // Handle background tasks here
  }
});

// Handle push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log('📨 Push notification received:', data);
    
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Open App',
          icon: '/icons/icon-96x96.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icons/icon-96x96.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked:', event.notification.tag);
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Share target handler (for future use)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHARE_TARGET') {
    console.log('📤 Share target received:', event.data);
    // Handle shared content
  }
});

// Update notification
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🎯 CodeToPrint Service Worker loaded successfully!');
