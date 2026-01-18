# ⚡ Quick Start Guide - Deploy in 5 Minutes!

Get your Muhammad Anees portfolio live on GitHub in just 5 minutes!

---

## 🚀 Fastest Method: Deploy to GitHub Pages

### Prerequisites
- Git installed
- Node.js installed
- GitHub account

---

## 📝 Step-by-Step Commands

### 1️⃣ Navigate to Your Project

```bash
cd mujtabaahmed-main
```

### 2️⃣ Initialize Git (if not done)

```bash
git init
git remote add origin https://github.com/anees0005/muhammadanees.git
```

### 3️⃣ Commit Your Code

```bash
git add .
git commit -m "Initial commit: Muhammad Anees Portfolio"
git branch -M main
git push -u origin main
```

### 4️⃣ Install Dependencies & Deploy

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Install gh-pages
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

### 5️⃣ Enable GitHub Pages

1. Go to: https://github.com/anees0005/muhammadanees/settings/pages
2. Under **Source**, select branch: `gh-pages`
3. Click **Save**
4. Wait 2-3 minutes

### 6️⃣ Visit Your Live Site! 🎉

**Your portfolio is now live at:**
https://anees0005.github.io/muhammadanees

---

## 🌐 Alternative: Deploy to Vercel (Even Easier!)

### Method: Vercel Website (No CLI needed)

1. **Push to GitHub** (Steps 1-3 above)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"**
4. Import `anees0005/muhammadanees`
5. Set **Root Directory**: `client`
6. Click **Deploy**
7. **Done!** Your site is live at: `https://muhammadanees.vercel.app`

---

## ✅ Verification

Test your deployed site:

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Games are playable
- [ ] Chatbot opens
- [ ] Contact links work
- [ ] CV downloads
- [ ] Mobile responsive

---

## 🔄 Future Updates

To update your live site:

### GitHub Pages:
```bash
cd client
npm run deploy
```

### Vercel:
```bash
git add .
git commit -m "Update portfolio"
git push
# Vercel auto-deploys!
```

---

## 🆘 Having Issues?

Check the full [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for troubleshooting.

---

## 🎊 That's It!

Your professional portfolio is now live! Share it with the world! 🌍

**Live URL**: https://anees0005.github.io/muhammadanees

---

*Made with ❤️ by Muhammad Anees*

