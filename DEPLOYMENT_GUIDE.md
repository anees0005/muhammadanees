# 🚀 Deployment Guide - Muhammad Anees Portfolio

This guide provides step-by-step instructions for deploying your portfolio website to GitHub repository: **https://github.com/anees0005/muhammadanees**

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ **Git** installed ([Download Git](https://git-scm.com/downloads))
- ✅ **Node.js 18+** installed ([Download Node.js](https://nodejs.org/))
- ✅ **GitHub account** ([Sign up](https://github.com/signup))
- ✅ **GitHub repository access** to `anees0005/muhammadanees`

---

## 🔧 Method 1: Deploy to GitHub Pages (Recommended for Static Sites)

### Step 1: Prepare Your Repository

```bash
# Navigate to your project root
cd mujtabaahmed-main

# Initialize git if not already done
git init

# Add GitHub remote (if not already added)
git remote add origin https://github.com/anees0005/muhammadanees.git

# Or if remote already exists, update it:
git remote set-url origin https://github.com/anees0005/muhammadanees.git
```

### Step 2: Install gh-pages Package

```bash
# Navigate to client directory
cd client

# Install gh-pages as a dev dependency
npm install --save-dev gh-pages
```

### Step 3: Configure for GitHub Pages

The following configurations are already set up in your project:

**✅ `client/package.json`:**
```json
{
  "homepage": "https://anees0005.github.io/muhammadanees",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**✅ `client/vite.config.ts`:**
```typescript
{
  base: "/muhammadanees/"
}
```

### Step 4: Build and Deploy

```bash
# Make sure you're in the client directory
cd client

# Install all dependencies
npm install

# Deploy to GitHub Pages (builds automatically)
npm run deploy
```

This will:
1. Build your production-ready site
2. Create a `gh-pages` branch
3. Push the `dist` folder to GitHub Pages
4. Your site will be live at: **https://anees0005.github.io/muhammadanees**

### Step 5: Enable GitHub Pages

1. Go to: https://github.com/anees0005/muhammadanees/settings/pages
2. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **Save**
4. Wait 2-3 minutes for deployment
5. Visit: **https://anees0005.github.io/muhammadanees**

---

## 🌐 Method 2: Deploy to Vercel (Recommended - Easiest & Fastest)

### Step 1: Push Code to GitHub

```bash
# From project root
cd mujtabaahmed-main

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit - Muhammad Anees Portfolio"

# Push to GitHub
git push -u origin main
# or if using master branch:
git push -u origin master
```

### Step 2: Deploy with Vercel

#### Option A: Using Vercel Website (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import `anees0005/muhammadanees` repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**
7. Your site will be live at: `https://muhammadanees.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Step 3: Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain (e.g., `muhammadanees.com`)
4. Follow DNS configuration instructions

---

## 🔷 Method 3: Deploy to Netlify

### Step 1: Push Code to GitHub

```bash
# Same as Method 2, Step 1
git add .
git commit -m "Deploy Muhammad Anees Portfolio"
git push -u origin main
```

### Step 2: Deploy with Netlify

#### Option A: Using Netlify Website

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select GitHub and authorize
5. Choose `anees0005/muhammadanees` repository
6. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
7. Click **Deploy site**
8. Your site will be live at: `https://[random-name].netlify.app`

#### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to client directory
cd client

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Deploy to production
netlify deploy --prod --dir=dist
```

---

## 📦 Method 4: Manual GitHub Push (Update Repository Only)

If you just want to push your code to GitHub without deploying:

### Step 1: Configure Git

```bash
# Navigate to project root
cd mujtabaahmed-main

# Initialize git
git init

# Configure your identity
git config user.name "Muhammad Anees"
git config user.email "anees05it@gmail.com"

# Add remote repository
git remote add origin https://github.com/anees0005/muhammadanees.git
```

### Step 2: Commit and Push

```bash
# Stage all files
git add .

# Commit with message
git commit -m "Initial commit: Muhammad Anees Professional Portfolio

- Complete portfolio website with 6 sections
- Interactive typing game and accounting quiz
- AI-powered chatbot assistant
- 20+ project showcase
- Three.js animated backgrounds
- Fully responsive design
- ACCA qualifications and work experience"

# Push to GitHub (main or master branch)
git push -u origin main

# If you get an error about branch name, try:
git branch -M main
git push -u origin main
```

### Step 3: Handle Existing Content

If the repository already has content:

```bash
# Pull existing content first
git pull origin main --allow-unrelated-histories

# Resolve any conflicts if needed
# Then push
git push -u origin main
```

Or force push (⚠️ **WARNING: This will overwrite existing content**):

```bash
git push -u origin main --force
```

---

## 🔍 Verification Checklist

After deployment, verify:

- ✅ **Homepage loads** correctly
- ✅ **Navigation works** (all sections scroll smoothly)
- ✅ **Three.js animations** render properly
- ✅ **Games are playable** (Typing Game, Accounting Quiz)
- ✅ **AI Chatbot opens** and responds
- ✅ **Contact links work** (WhatsApp, Email, LinkedIn, GitHub)
- ✅ **CV downloads** work correctly
- ✅ **Mobile responsive** (test on phone)
- ✅ **Favicon displays** correctly
- ✅ **Logo and branding** match your identity
- ✅ **All project links** open correctly
- ✅ **No console errors** (press F12 to check)

---

## 🛠️ Troubleshooting

### Issue: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Build fails with TypeScript errors

**Solution:**
```bash
# Check TypeScript errors
npm run type-check

# Fix errors in the reported files
# Or temporarily disable strict mode in tsconfig.json
```

### Issue: Three.js animations not showing

**Solution:**
- Check browser console for WebGL errors
- Ensure browser supports WebGL
- Try a different browser (Chrome recommended)

### Issue: GitHub Pages shows 404

**Solution:**
1. Ensure `gh-pages` branch exists
2. Check GitHub Pages settings (Settings → Pages)
3. Verify base URL in `vite.config.ts` matches repo name
4. Wait 5-10 minutes for GitHub to propagate

### Issue: Images not loading

**Solution:**
- Check image paths are relative
- Ensure images are in `public` or `src/assets` folder
- Verify base URL configuration

### Issue: Can't push to GitHub (authentication error)

**Solution:**
```bash
# Use personal access token instead of password
# Generate token at: https://github.com/settings/tokens

# Or use SSH instead of HTTPS
git remote set-url origin git@github.com:anees0005/muhammadanees.git
```

---

## 🔄 Updating Your Deployed Site

### For GitHub Pages:

```bash
cd client
npm run deploy
```

### For Vercel/Netlify:

```bash
# Just push to GitHub
git add .
git commit -m "Update portfolio content"
git push

# Vercel/Netlify will auto-deploy
```

---

## 📊 Performance Optimization

Before deploying, optimize your site:

### 1. Minify Assets
```bash
# Already configured in vite.config.ts
npm run build
```

### 2. Image Optimization
- Use WebP format for images
- Compress images with [TinyPNG](https://tinypng.com)
- Lazy load images

### 3. Code Splitting
- Already configured in `vite.config.ts`
- Vendor, UI, and Three.js chunks separated

### 4. Check Bundle Size
```bash
npm run build
# Check dist folder size
```

---

## 🌟 Post-Deployment Tasks

After successful deployment:

1. ✅ **Test on multiple devices** (phone, tablet, desktop)
2. ✅ **Test on multiple browsers** (Chrome, Firefox, Safari, Edge)
3. ✅ **Update LinkedIn** with portfolio link
4. ✅ **Update GitHub profile** README with portfolio link
5. ✅ **Share on social media**
6. ✅ **Submit to Google Search Console**
7. ✅ **Add Google Analytics** (optional)
8. ✅ **Monitor performance** with Lighthouse

---

## 📱 Quick Deploy Commands Reference

```bash
# GitHub Pages
cd client && npm run deploy

# Vercel CLI
cd client && vercel --prod

# Netlify CLI
cd client && netlify deploy --prod --dir=dist

# Regular Git Push
git add . && git commit -m "Update" && git push
```

---

## 🆘 Need Help?

If you encounter issues:

1. **Check the console** for errors (F12 in browser)
2. **Review build logs** in terminal
3. **Google the error message**
4. **Check GitHub Issues** for similar problems
5. **Contact support**:
   - GitHub: [@anees0005](https://github.com/anees0005)
   - Email: anees05it@gmail.com

---

## 🎉 Success!

Once deployed, your portfolio will be live at one of these URLs:

- 🌐 **GitHub Pages**: https://anees0005.github.io/muhammadanees
- 🌐 **Vercel**: https://muhammadanees.vercel.app
- 🌐 **Netlify**: https://[your-site-name].netlify.app

**Share it with the world! 🚀**

---

<div align="center">

**Happy Deploying! 🎊**

*Built with ❤️ by Muhammad Anees*

</div>

