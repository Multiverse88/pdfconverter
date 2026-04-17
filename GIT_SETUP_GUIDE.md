# 🚀 Git & GitHub Setup Guide

## Setup GitHub Repository

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "+" icon → "New repository"
3. Fill requirements:
   - **Repository name:** `pdfconverter`
   - **Description:** (Optional) API untuk konversi HTML ke PDF
   - **Privacy:** Public / Private (sesuai preferensi)
   - **Initialize:** Do NOT initialize (kita punya files)
4. Click "Create repository"

GitHub akan memberikan instructions:

```bash
# …or create a new repository on the command line
echo "# pdfconverter" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pdfconverter.git
git push -u origin main
```

### 2. Initialize Git Locally

Di folder `d:\Projects\pdfconverter`:

```bash
# Jika belum initialized
git init

# Add all files
git add .

# Verify files yang akan di-commit
git status

# Commit with message
git commit -m "Initial commit - PDF Converter API"

# Setup main branch
git branch -M main

# Add GitHub repository sebagai remote
git remote add origin https://github.com/YOUR_USERNAME/pdfconverter.git

# Push ke GitHub
git push -u origin main
```

### 3. Verify di GitHub

1. Refresh GitHub repository page
2. Semua files sudah ada
3. Green "Code" button menunjukkan repository siap

## First Commit Checklist

Sebelum commit:

```bash
# Check status
git status

# Should show files untuk di-add:
# - package.json ✅
# - vercel.json ✅
# - api/convert.js ✅
# - .gitignore ✅
# - README.md ✅
# - dll ✅

# NOT should include:
# - node_modules/ ❌ (di .gitignore)
# - .env ❌ (di .gitignore)
# - .env.local ❌ (di .gitignore)
```

## Standard Git Workflow

Setelah first commit:

```bash
# 1. Make changes
nano api/convert.js

# 2. Check what changed
git status
git diff

# 3. Stage changes
git add api/convert.js
# atau add semua
git add .

# 4. Commit
git commit -m "Fix: handle timeout errors better"

# 5. Push
git push origin main
```

## Create Development Branch (Optional)

```bash
# Create feature branch
git checkout -b develop
git push -u origin develop

# Later, merge back to main
git checkout main
git merge develop
git push origin main
```

## Git Commit Best Practices

Format commit messages:

```
<type>: <subject>

<body>

<footer>
```

### Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactor
- `test:` - Tests
- `chore:` - Build process, deps

### Examples:

```bash
git commit -m "feat: add Blob Storage support"
git commit -m "fix: handle timeout errors"
git commit -m "docs: update API examples"
git commit -m "chore: update dependencies"
```

## Push to Vercel (Connected to GitHub)

Setelah push ke GitHub:

### 1. Connect Vercel ke GitHub

```bash
# Install Vercel CLI
npm install -g vercel

# Login dengan GitHub
vercel login

# Deploy
vercel
```

### 2. Atau Via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Select your GitHub account
5. Select "pdfconverter" repository
6. Click "Import"
7. Configure:
   - Framework: "Other"
   - Build command: (leave empty)
   - Output directory: (leave empty)
8. Add environment variables
9. Click "Deploy"

## Automatic Deployment (Recommended)

Setelah connect GitHub ke Vercel:

**Setiap push ke GitHub → Automatic deploy ke Vercel** 🎉

```bash
# Make change locally
git commit -am "Update API"
git push origin main
# ↓
# Vercel automatically deploys
# ✅ New URL: https://your-project.vercel.app
```

## Common Git Issues

### Issue: `.env.local` accidentally committed

```bash
# Remove from git (doesn't delete local file)
git rm --cached .env.local

# Add to .gitignore
echo ".env.local" >> .gitignore

# Commit fix
git add .gitignore
git commit -m "Remove .env.local from git history"
git push origin main
```

### Issue: Undo recent commit

```bash
# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Fix & recommit
git add .
git commit -m "Fixed commit"
git push origin main -f  # Force push (careful!)
```

### Issue: Want to see commit history

```bash
# View commits
git log

# View with graph
git log --oneline --graph --all

# View changes in commit
git show <commit-id>
```

## GitHub Features

### 1. Create Pull Request (PR)

```bash
# Create feature branch
git checkout -b fix/timeout-issue

# Make changes & commit
git commit -m "fix: handle timeout better"

# Push branch
git push origin fix/timeout-issue
```

Then on GitHub:
- Click "Compare & pull request"
- Add description
- Click "Create pull request"

### 2. Code Review

- Collaborators review code
- Comments & suggestions
- Approve & merge when ready

### 3. Releases

```bash
# Tag a version
git tag -a v1.0.0 -m "Version 1.0.0"

# Push tags
git push origin v1.0.0

# GitHub → Releases automatically shows tags
```

## Useful Git Commands

```bash
# View branches
git branch -a

# Switch branch
git checkout branch-name

# Create & switch branch
git checkout -b new-branch

# Delete branch
git branch -d branch-name

# View remote status
git remote -v

# Fetch latest from GitHub
git fetch origin

# Pull & merge latest
git pull origin main

# Stash changes (temporary save)
git stash

# Apply stashed changes
git stash pop
```

## Connect to Multiple Remote (Advanced)

```bash
# List remotes
git remote -v

# Add another remote
git remote add upstream https://github.com/original-owner/pdfconverter.git

# Fetch from upstream
git fetch upstream

# Merge upstream main into local main
git checkout main
git merge upstream/main
```

## Next: Deploy to Vercel Integration

After pushing to GitHub:

1. ✅ GitHub repository created & pushed
2. ⏭️ Next, connect to Vercel
3. ⏭️ Setup environment variables in Vercel
4. ⏭️ Deploy!

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed Vercel instructions.

## GitHub CLI Commands (Optional)

```bash
# Install GitHub CLI
brew install gh  # macOS
choco install gh # Windows
apt install gh   # Linux

# Login
gh auth login

# Create repo & push
gh repo create pdfconverter --source=. --remote=origin --push
```

## Resources

- 📖 [GitHub Docs](https://docs.github.com)
- 📖 [Git Documentation](https://git-scm.com/docs)
- 🚀 [GitHub & Vercel Integration](https://vercel.com/docs/concepts/git)

---

**Quick Summary:**
```bash
# 1. Create repo on GitHub
# 2. git init && git add . && git commit -m "Initial"
# 3. git remote add origin https://github.com/user/pdfconverter.git
# 4. git push -u origin main
# 5. Connect to Vercel
# 6. 🎉 Done!
```
