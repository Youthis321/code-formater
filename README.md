# � CodeToPrint - Universal Code Formatter PWA

**CodeToPrint** adalah **Progressive Web App (PWA)** yang memformat dan me## 🌐 Deployment ke Vercel

### Quick Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Youthis321/code-formater)

### Manual Deploy dengan PWA Verification
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy dengan PWA check (recommended)
npm run deploy

# Atau deploy langsung
vercel --prod

# Deploy preview/testing
npm run deploy:preview
# Atau
vercel
```

### 📱 PWA Production Features
- ✅ **HTTPS Required** (automatically handled by Vercel)
- ✅ **Service Worker** caching untuk performa optimal
- ✅ **Manifest.json** dengan metadata lengkap
- ✅ **PWA Icons** (10 sizes: 16px-512px)
- ✅ **Install Prompts** untuk semua platform
- ✅ **Offline Functionality** dengan cache strategy

**📖 Detail deployment guide**: Lihat [DEPLOYMENT.md](./DEPLOYMENT.md)i berbagai bahasa pemrograman dalam format yang siap cetak dengan syntax highlighting yang indah. **Dapat diinstall di Android seperti aplikasi native!**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-success.svg)
![Bun](https://img.shields.io/badge/runtime-Bun-orange.svg)
![Elysia](https://img.shields.io/badge/framework-Elysia.js-green.svg)
![Android](https://img.shields.io/badge/Android-Compatible-green.svg)

## ✨ Fitur Utama

### � Progressive Web App (PWA)
- ✅ **Install di Android** seperti aplikasi native
- ✅ **Offline Support** - bekerja tanpa internet
- ✅ **Background Sync** - update otomatis saat online
- ✅ **App Shortcuts** - quick actions dari home screen
- ✅ **Splash Screen** - loading screen dengan branding
- ✅ **Standalone Mode** - berjalan tanpa browser UI
- ✅ **Push Notifications** ready (untuk enhancement)

### �📁 Multi-Language Support
- **Python** (.py)
- **JavaScript** (.js, .jsx)
- **TypeScript** (.ts, .tsx)
- **HTML** (.html, .htm)
- **CSS** (.css)
- **Java** (.java)
- **JSON** (.json)
- **PHP** (.php)
- **C++** (.cpp)
- **C#** (.cs)
- **Dan bahasa lainnya...**

### 🎨 Fitur Tampilan
- ✅ **Syntax Highlighting** dengan Prism.js
- ✅ **Dark/Light Theme** toggle
- ✅ **Line Numbers** yang dapat diaktifkan/nonaktifkan
- ✅ **Word Wrap** untuk kode panjang
- ✅ **Print-Friendly** formatting
- ✅ **Responsive Design** untuk desktop dan mobile

### ⚙️ Pengaturan Kustomisasi
- 📏 **Font Size** (10px - 20px)
- 📐 **Line Height** (1.0 - 2.0)
- 📊 **Max Width** (600px - 1200px)
- 🔢 **Toggle Line Numbers**
- 📝 **Word Wrap** option

### 🔧 Fitur Interaksi
- 📤 **Upload File** dengan drag & drop
- 📋 **Copy to Clipboard**
- 🖨️ **Print** optimized
- ⌨️ **Keyboard Shortcuts**
- 🔄 **Real-time Preview**
- 📲 **PWA Installation** prompts
- 🔄 **Auto Update** notifications

### 🌐 PWA Installation Methods
- 📱 **Android**: Chrome menu > "Add to Home screen"
- 🖥️ **Desktop**: Chrome install prompt atau DevTools
- ⚡ **Auto Prompt**: Muncul setelah user engagement
- 🔧 **Developer**: DevTools > Application > Manifest > Install

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) v1.0+ (untuk development)
- [Node.js](https://nodejs.org/) v18+ (untuk production/Vercel)

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd Program-Code-Formatter
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### 📱 PWA Testing & Installation

1. **Test PWA functionality**
   ```bash
   # Complete PWA verification
   bun run pwa:full-test
   
   # Installation guide
   bun run install:trigger
   
   # Interactive testing
   bun run install:test
   ```

2. **PWA Test URLs**
   ```
   Main App: http://localhost:3000
   Install Test: http://localhost:3000/install-test
   PWA Verification: http://localhost:3000/pwa-test.html
   Android Ready: http://localhost:3000/android-ready
   ```

3. **Android Installation**
   - Buka Chrome di Android
   - Visit localhost:3000 atau domain production
   - Chrome menu (⋮) > "Add to Home screen"
   - Konfirmasi installation
   - App muncul di home screen!

## 🌐 Deployment ke Vercel

### Quick Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Youthis321/code-formater)

### Manual Deploy dengan PWA Verification
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy dengan PWA check
bun run deploy

# Deploy preview
bun run deploy:preview
```

### 📱 PWA Production Features
- ✅ **HTTPS Required** (automatically handled by Vercel)
- ✅ **Service Worker** caching untuk performa optimal
- ✅ **Manifest.json** dengan metadata lengkap
- ✅ **PWA Icons** (10 sizes: 16px-512px)
- ✅ **Install Prompts** untuk semua platform
- ✅ **Offline Functionality** dengan cache strategy

**📖 Detail deployment guide**: Lihat [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📖 Cara Penggunaan

### 1. Upload File Kode
- Klik tombol **"📂 Upload File"** atau drag & drop file
- Atau paste kode langsung di textarea

### 2. Pilih Bahasa
- Secara otomatis terdeteksi dari ekstensi file
- Atau pilih manual dari dropdown

### 3. Atur Preferensi
- Font size, line height, max width
- Toggle line numbers dan word wrap
- Pilih theme (light/dark)

### 4. Format & Preview
- Klik **"🎯 Format Kode"**
- Lihat preview dengan syntax highlighting

### 5. Print atau Copy
- **"🖨️ Print"** untuk mencetak
- **"📋 Copy Code"** untuk menyalin

### 6. Install sebagai PWA (Opsional)
- **Android**: Chrome menu > "Add to Home screen"
- **Desktop**: Klik install prompt atau DevTools
- **Offline**: App tetap bisa digunakan tanpa internet

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Format kode |
| `Ctrl/Cmd + P` | Print kode |
| `Escape` | Clear kode |
| `Ctrl/Cmd + I` | Toggle install prompt (PWA) |

## 🛠️ Teknologi

### Core Technologies
- **Backend**: [Elysia.js](https://elysiajs.com/) - Fast web framework
- **Runtime**: [Bun](https://bun.sh/) - JavaScript runtime  
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Syntax Highlighting**: [Prism.js](https://prismjs.com/)
- **Language**: TypeScript

### PWA Technologies
- **Service Worker**: Cache & offline support
- **Web App Manifest**: PWA metadata & installation
- **Cache API**: Strategic caching untuk performa
- **Background Sync**: Update saat online
- **IndexedDB**: Local storage untuk offline data

## 📁 Struktur Project

```
Program-Code-Formatter/
├── public/                    # Static files & PWA assets
│   ├── index.html            # Main HTML file
│   ├── styles.css            # CSS styles
│   ├── script.js             # JavaScript logic
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service Worker
│   ├── pwa-test.html         # PWA testing interface
│   ├── install-test.html     # Installation testing
│   ├── android-ready.html    # Android ready page
│   ├── robots.txt            # SEO robots
│   ├── sitemap.xml           # SEO sitemap
│   └── icons/                # PWA icons (10 sizes)
│       ├── icon-16x16.svg
│       ├── icon-32x32.svg
│       ├── icon-72x72.svg
│       ├── icon-96x96.svg
│       ├── icon-128x128.svg
│       ├── icon-144x144.svg
│       ├── icon-152x152.svg
│       ├── icon-192x192.svg
│       ├── icon-384x384.svg
│       └── icon-512x512.svg
├── src/                       # Source code (utilities)
├── .github/
│   └── copilot-instructions.md
├── api/
│   └── index.js              # Vercel serverless function
├── vercel.json               # Vercel deployment config
├── index.ts                  # Main Elysia server
├── package.json
├── tsconfig.json
├── pwa-verify.js             # PWA verification script
├── test-endpoints.js         # Endpoint testing
├── trigger-install.js        # Install guide script
├── generate-icons.js         # Icon generation utility
├── PWA-SUCCESS.md            # PWA implementation docs
├── PWA-ANDROID-READY.md      # Android installation guide
├── DEPLOYMENT.md             # Deployment documentation
└── README.md
```

## 🔧 Development

### Available Scripts

```bash
# Development & Production
bun run dev              # Development server dengan hot reload
bun run start            # Production start
bun run build            # Build untuk production
bun run clean            # Clean build files

# PWA Commands
bun run pwa:verify       # Verify PWA implementation
bun run pwa:test         # Open PWA test interface  
bun run pwa:full-test    # Complete PWA testing suite
bun run pwa:audit        # Lighthouse audit instructions
bun run pwa:install      # Installation instructions

# Installation Testing
bun run install:trigger  # Show installation guide
bun run install:test     # Interactive install testing

# Testing & Verification
bun run test:endpoints   # Test all API endpoints
bun run deploy          # Deploy to production with PWA check
bun run deploy:preview   # Deploy preview version
```

### API Endpoints

#### Main Application
- `GET /` - Main application interface
- `GET /android-ready` - Android installation ready page
- `GET /install-test` - Interactive installation testing
- `GET /pwa-test.html` - PWA verification interface

#### PWA Assets  
- `GET /manifest.json` - Web App Manifest
- `GET /sw.js` - Service Worker
- `GET /icons/*` - PWA icons (various sizes)

#### Static Files
- `GET /static/*` - CSS, JS, dan asset files
- `GET /robots.txt` - SEO robots file
- `GET /sitemap.xml` - SEO sitemap

#### Future Enhancements
- `POST /api/format` - Backend code formatting
- `GET /api/stats` - Usage statistics

## 🎯 Roadmap

### ✅ Completed (v1.0)
- [x] **Progressive Web App** implementation
- [x] **Android Installation** support
- [x] **Offline Functionality** dengan Service Worker
- [x] **PWA Icons** dan manifest.json
- [x] **Installation Testing** tools
- [x] **Background Sync** capabilities

### 🚧 In Progress  
- [ ] **Push Notifications** untuk update alerts
- [ ] **Advanced Caching** strategies
- [ ] **Performance Optimization** dengan Lighthouse audit

### 📋 Planned Features
- [ ] **Backend Code Formatting** dengan prettier/eslint
- [ ] **More Languages** support (Go, Rust, Kotlin, Swift)
- [ ] **Code Validation** dan error detection
- [ ] **Export to PDF** functionality
- [ ] **Custom Themes** creator
- [ ] **Code Statistics** analysis
- [ ] **Batch Processing** untuk multiple files
- [ ] **PWA Store Submission** (Google Play via TWA)
- [ ] **Desktop PWA** optimization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Prism.js](https://prismjs.com/) untuk syntax highlighting yang indah
- [Elysia.js](https://elysiajs.com/) untuk web framework yang cepat
- [Bun](https://bun.sh/) untuk runtime yang super cepat
- [Vercel](https://vercel.com/) untuk hosting dan deployment
- [PWA Builder](https://www.pwabuilder.com/) untuk PWA best practices
- **Web Standards** untuk teknologi PWA yang powerful

## 📱 PWA Installation Status

**🎉 Ready for Installation!** 

CodeToPrint sekarang adalah **Progressive Web App** yang dapat:
- ✅ Diinstall di Android seperti aplikasi native
- ✅ Bekerja offline dengan Service Worker
- ✅ Update otomatis di background  
- ✅ Memberikan experience seperti native app
- ✅ Mendukung app shortcuts dan splash screen

**Install sekarang di Android**: Buka Chrome > Visit app > Menu > "Add to Home screen"

---

**Dibuat dengan ❤️ untuk developer yang ingin mencetak kode dengan indah - sekarang sebagai PWA!** 📱✨
