# 🪟 Windows Setup Guide - Install Git & Deploy

## ⚠️ Git Not Found Error

If you see this error:
```
git : The term 'git' is not recognized as the name of a cmdlet...
```

This means Git is not installed on your Windows computer. Follow these steps:

---

## 📥 Step 1: Install Git for Windows

### Method 1: Download Git Installer (Recommended)

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Click "Click here to download" (64-bit Git for Windows Setup)
   - File will be named: `Git-2.XX.X-64-bit.exe`

2. **Install Git:**
   - Run the downloaded installer
   - Click "Next" through all options (default settings are fine)
   - ✅ Make sure "Git from the command line and also from 3rd-party software" is selected
   - ✅ Make sure "Use Windows' default console window" is selected
   - Click "Install"
   - Click "Finish"

3. **Verify Installation:**
   - Close and reopen PowerShell (important!)
   - Run: `git --version`
   - Should show: `git version 2.XX.X`

### Method 2: Install via Winget (Windows 11)

```powershell
winget install --id Git.Git -e --source winget
```

Then close and reopen PowerShell.

---

## 🚀 Alternative: Deploy WITHOUT Git (Use Vercel/Netlify)

If you don't want to install Git, you can still deploy using these methods:

### Option A: Vercel Desktop App

1. **Download Vercel Desktop:**
   - Go to: https://vercel.com/download
   - Install Vercel Desktop for Windows
   
2. **Deploy:**
   - Open Vercel Desktop
   - Drag and drop your `client` folder
   - Vercel will deploy automatically!
   - Get your live URL: `https://muhammadanees.vercel.app`

### Option B: Netlify Drop

1. **Build your project first:**
```powershell
cd "C:\Users\UK COMPUTER\Downloads\mujtabaahmed-main\mujtabaahmed-main\client"
npm install
npm run build
```

2. **Deploy via Netlify Drop:**
   - Go to: https://app.netlify.com/drop
   - Sign in or create account
   - Drag and drop the `dist` folder
   - Get your live URL instantly!

---

## ✅ After Installing Git

Once Git is installed, use these commands:

```powershell
# Navigate to project
cd "C:\Users\UK COMPUTER\Downloads\mujtabaahmed-main\mujtabaahmed-main"

# Initialize Git
git init

# Configure Git (use your details)
git config user.name "Muhammad Anees"
git config user.email "anees05it@gmail.com"

# Add GitHub remote
git remote add origin https://github.com/anees0005/muhammadanees.git

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Muhammad Anees Portfolio"

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

If you get authentication error, you'll need a Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`, `workflow`
4. Use token as password when pushing

---

## 🎯 Recommended Path for Windows Users

### Easiest Method: Vercel (No Git needed!)

1. **Install Node.js** (if not installed):
   - Download from: https://nodejs.org/
   - Install LTS version

2. **Build your project:**
```powershell
cd "C:\Users\UK COMPUTER\Downloads\mujtabaahmed-main\mujtabaahmed-main\client"
npm install
npm run build
```

3. **Install Vercel CLI:**
```powershell
npm install -g vercel
```

4. **Deploy:**
```powershell
vercel login
# Login with GitHub in browser
vercel --prod
```

5. **Done!** Your site is live at: `https://muhammadanees.vercel.app`

---

## 🔧 Troubleshooting

### Issue: "npm is not recognized"

**Solution:** Install Node.js
- Download from: https://nodejs.org/
- Install and restart PowerShell

### Issue: Can't push to GitHub (authentication)

**Solution:** Use Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Generate new token
3. Copy token
4. Use as password when Git asks

### Issue: PowerShell execution policy error

**Solution:** Run as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📋 Quick Checklist

- [ ] Node.js installed (check: `node --version`)
- [ ] Git installed (check: `git --version`) OR use Vercel method
- [ ] GitHub account created
- [ ] Repository created at: github.com/anees0005/muhammadanees
- [ ] Project dependencies installed (`npm install`)
- [ ] Project builds successfully (`npm run build`)

---

## 🎊 Next Steps

Choose the easiest method for you:

1. **If you installed Git:** Follow `DEPLOY_COMMANDS.txt`
2. **If you prefer no Git:** Use Vercel CLI (see above)
3. **If you want visual interface:** Use Vercel Desktop or Netlify Drop

---

## 📧 Need Help?

**Muhammad Anees**
- Email: anees05it@gmail.com
- WhatsApp: +92 343 3523057

---

<div align="center">

**You're almost there! Just install Git or use Vercel! 🚀**

</div>

