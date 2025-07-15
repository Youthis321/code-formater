# 🚀 CodeToPrint - Universal Code Formatter

**CodeToPrint** adalah aplikasi web yang memformat dan menampilkan kode dari berbagai bahasa pemrograman dalam format yang siap cetak dengan syntax highlighting yang indah.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Bun](https://img.shields.io/badge/runtime-Bun-orange.svg)
![Elysia](https://img.shields.io/badge/framework-Elysia.js-green.svg)

## ✨ Fitur Utama

### 📁 Multi-Language Support
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

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) v1.0+

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

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Format kode |
| `Ctrl/Cmd + P` | Print kode |
| `Escape` | Clear kode |

## 🛠️ Teknologi

- **Backend**: [Elysia.js](https://elysiajs.com/) - Fast web framework
- **Runtime**: [Bun](https://bun.sh/) - JavaScript runtime
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Syntax Highlighting**: [Prism.js](https://prismjs.com/)
- **Language**: TypeScript

## 📁 Struktur Project

```
Program-Code-Formatter/
├── public/                 # Static files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── script.js          # JavaScript logic
├── src/                   # Source code (utilities)
├── .github/
│   └── copilot-instructions.md
├── index.ts               # Main Elysia server
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Development

### Available Scripts

```bash
# Development server dengan hot reload
bun run dev

# Production start
bun run start

# Build untuk production
bun run build

# Clean build files
bun run clean
```

### API Endpoints

- `GET /` - Main application
- `POST /api/format` - Format code (future enhancement)
- `/static/*` - Static files

## 🎯 Roadmap

- [ ] **Backend Code Formatting** dengan prettier/eslint
- [ ] **More Languages** support
- [ ] **Code Validation** dan error detection
- [ ] **Export to PDF** functionality
- [ ] **Custom Themes** creator
- [ ] **Code Statistics** analysis
- [ ] **Batch Processing** untuk multiple files

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Prism.js](https://prismjs.com/) untuk syntax highlighting
- [Elysia.js](https://elysiajs.com/) untuk web framework
- [Bun](https://bun.sh/) untuk runtime yang cepat

---

**Dibuat dengan ❤️ untuk developer yang ingin mencetak kode dengan indah!**
