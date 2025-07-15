# 🚀 Deployment Guide - CodeToPrint ke Vercel

## 📋 Prerequisites

1. **Akun Vercel**: Daftar di [vercel.com](https://vercel.com)
2. **Git Repository**: Project harus di Git (GitHub/GitLab/Bitbucket)
3. **Vercel CLI** (optional): `npm i -g vercel`

## 🔧 Persiapan Deploy

### 1. Setup Git Repository

```bash
# Initialize git (jika belum)
git init

# Add semua files
git add .

# Commit pertama
git commit -m "🚀 Initial commit - CodeToPrint ready for deployment"

# Connect ke remote repository
git remote add origin <YOUR_REPO_URL>

# Push ke remote
git push -u origin main
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. **Login ke Vercel**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Import Project**: 
   - Klik "Add New" → "Project"
   - Select Git Repository
   - Pilih repository "Program-Code-Formatter"
3. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (optional)
   - **Output Directory**: `./` (default)
4. **Deploy**: Klik "Deploy"

### 3. Deploy via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy untuk pertama kali
vercel

# Deploy ke production
vercel --prod
```

## ⚙️ Environment Variables (Optional)

Jika ada environment variables, set di Vercel Dashboard:

1. Go to Project Settings
2. Environment Variables tab
3. Add variables:
   - `NODE_ENV=production`

## 🔄 Auto Deployment

Setelah deploy pertama, Vercel akan otomatis deploy setiap kali ada push ke:
- **Production**: `main` branch
- **Preview**: branch lainnya

## 📁 File Structure untuk Vercel

```
Program-Code-Formatter/
├── api/
│   └── index.js           # Vercel serverless function
├── public/
│   ├── index.html         # Main app
│   ├── styles.css         # Styles  
│   └── script.js          # Frontend logic
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies
└── README.md
```

## 🛠️ Troubleshooting

### Problem: Static files tidak load
**Solution**: Pastikan `vercel.json` routing sudah benar untuk static files

### Problem: API tidak berfungsi
**Solution**: Check `api/index.js` dan pastikan request handling sudah benar

### Problem: Build error
**Solution**: Check `package.json` scripts dan pastikan dependencies lengkap

## 📊 Commands untuk Development vs Production

```bash
# Local development (Bun)
bun run dev

# Production build
npm run build

# Deploy to Vercel
vercel --prod
```

## 🔗 Domain Custom (Optional)

1. **Buy Domain**: Dari provider domain
2. **Add Domain** di Vercel:
   - Project Settings → Domains
   - Add domain
   - Follow DNS setup instructions

## 🎯 Post-Deployment Checklist

- [ ] ✅ Website accessible di URL Vercel
- [ ] ✅ File upload berfungsi
- [ ] ✅ Syntax highlighting bekerja
- [ ] ✅ Print function berfungsi
- [ ] ✅ All themes (light/dark) bekerja
- [ ] ✅ Mobile responsive
- [ ] ✅ API endpoints responding

## 🔥 Quick Deploy Commands

```bash
# Push changes dan auto-deploy
git add .
git commit -m "✨ Feature update"
git push origin main

# Manual deploy via CLI
vercel --prod
```

## 📱 URLs After Deployment

- **Production**: `https://your-project-name.vercel.app`
- **Preview**: `https://your-project-name-git-branch.vercel.app`

---

**🎉 Selamat! CodeToPrint sudah live di internet!**
