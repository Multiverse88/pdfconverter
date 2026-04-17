# 📦 Project Structure & File Guide

## Direktori Utama Structure

```
pdfconverter/
├── 📁 api/                          # Serverless functions untuk Vercel
│   ├── convert.js                   # Main API endpoint (URL/HTML → PDF)
│   ├── convert-with-storage.js      # Advanced endpoint dengan Blob Storage
│   └── health.js                    # Health check endpoint
│
├── 📁 examples/                     # Contoh penggunaan API
│   ├── nodejs-url-example.js        # Contoh Node.js convert URL
│   ├── nodejs-html-example.js       # Contoh Node.js convert HTML
│   ├── python-example.py            # Contoh Python
│   ├── web-example.html             # Contoh HTML/Frontend
│   └── curl-examples.sh             # cURL examples
│
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies & scripts
│   ├── vercel.json                  # Vercel deployment config
│   ├── .env.example                 # Environment variables template
│   ├── .env.local                   # Local environment (jangan commit!)
│   ├── .gitignore                   # Git ignore rules
│   ├── .vercelignore                # Vercel ignore rules
│   ├── Dockerfile                   # Docker image definition
│   └── docker-compose.yml           # Docker compose config
│
├── 📚 Documentation
│   ├── README.md                    # Main documentation
│   ├── QUICK_START.md               # Quick start guide (5 menit)
│   ├── DEPLOYMENT_GUIDE.md          # Detailed deployment instructions
│   ├── SETUP_CHECKLIST.md          # Pre & post deployment checklist
│   ├── API_RESPONSES.md             # API response examples
│   └── PROJECT_STRUCTURE.md         # This file
│
├── 🧪 Testing
│   └── test-api.js                  # Local API testing script
│
└── 📋 Root Files
    └── Various config files
```

## File Details

### 🔧 Configuration Files

| File | Purpose | Edit? |
|------|---------|-------|
| `package.json` | Dependencies & npm scripts | ✅ Update versions as needed |
| `vercel.json` | Vercel deployment config | ⚠️ Only if changing routes |
| `.env.example` | Environment variables template | ✅ Update with actual keys |
| `.env.local` | Local environment variables | ❌ NEVER commit to git |
| `.gitignore` | Files to ignore in git | ⚠️ Already configured |
| `.vercelignore` | Files to ignore in Vercel | ⚠️ Already configured |

### 📡 API Endpoints

#### `/api/convert.js`
**Purpose:** Main API endpoint untuk konversi HTML/URL ke PDF

**Request:** `POST /api/convert`

**Features:**
- Convert URL to PDF
- Convert HTML string to PDF
- Customizable page size, orientation, margins
- Error handling & validation

**Environment Variables:**
- `PDF_ENDPOINT_API_KEY` (required)
- `PDF_ENDPOINT_URL` (optional)

#### `/api/convert-with-storage.js`
**Purpose:** Advanced converter dengan Vercel Blob Storage support

**Differences:**
- Saves PDF to Vercel Blob Storage
- Returns shareable URL instead of binary
- Optional storage feature

**Dependencies:**
- `@vercel/blob` (install with: `npm install @vercel/blob`)

#### `/api/health.js`
**Purpose:** Health check endpoint untuk monitoring

**Response:** Status JSON dengan timestamp

**Use Case:** Monitoring, uptime checks, load balancers

### 📚 Documentation Files

| File | Contents | Read When |
|------|----------|-----------|
| `README.md` | Complete API documentation | Before deployment |
| `QUICK_START.md` | 5-minute setup guide | First time setup |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment steps | When deploying |
| `SETUP_CHECKLIST.md` | Pre/post deployment checklist | Before & after deploy |
| `API_RESPONSES.md` | Response examples & debugging | When integrating API |

### 💡 Example Files

| File | Language | Use Case |
|------|----------|----------|
| `nodejs-url-example.js` | Node.js | Backend integration |
| `nodejs-html-example.js` | Node.js | Invoice/report generation |
| `python-example.py` | Python | Python integration |
| `web-example.html` | HTML/JavaScript | Frontend/web app |
| `curl-examples.sh` | Bash/Shell | CLI/scripting |

### 🐳 Docker Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Container image definition |
| `docker-compose.yml` | Local development with docker |

**Usage:**
```bash
# Build & run with Docker
docker-compose up

# Or manual Docker
docker build -t pdfconverter .
docker run -p 3000:3000 -e PDF_ENDPOINT_API_KEY=xxx pdfconverter
```

## Key Files to Modify

### Before Deployment

1. **`.env.local`** - Add your PDFEndpoint API key
   ```
   PDF_ENDPOINT_API_KEY=pdfe_live_xxxxx
   ```

2. **`.env.example`** - Keep as template (don't commit `.env.local`)
   ```
   PDF_ENDPOINT_API_KEY=pdfe_live_example_key
   ```

3. **`package.json`** - Can update dependencies if needed
   ```json
   {
     "dependencies": {
       "axios": "^1.6.0"
     }
   }
   ```

### Usually Don't Need to Modify

- ✅ `api/convert.js` - Already complete
- ✅ `api/health.js` - Already complete
- ✅ `vercel.json` - Already configured for Vercel
- ✅ `.gitignore` - Already has standard rules
- ✅ Documentation files - Already complete

## First Time Workflow

### 1. Setup Locally (5 min)
```bash
npm install
cp .env.example .env.local
# Edit .env.local with API key
npm run dev
curl http://localhost:3000/api/health
```

### 2. Test Locally (5 min)
```bash
node test-api.js
# or
node examples/nodejs-url-example.js
```

### 3. Push to Git (2 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/pdfconverter.git
git push -u origin main
```

### 4. Deploy to Vercel (5 min)
```bash
npm install -g vercel
vercel login
vercel
```

### 5. Configure Environment (2 min)
- Vercel Dashboard → Settings → Environment Variables
- Add `PDF_ENDPOINT_API_KEY`
- Redeploy

## File Dependencies

```
Deployment Flow:
  ├── package.json
  │   └── Dependencies (axios, dotenv)
  │
  ├── vercel.json
  │   └── Routes api/convert.js → /api/convert
  │
  ├── .env.local / Environment Variables
  │   └── API_KEY used by api/convert.js
  │
  ├── api/convert.js
  │   ├── Uses: axios, .env variables
  │   └── Calls: PDFEndpoint API
  │
  └── Result: PDF binary response
```

## Important Notes

### ⚠️ DO NOT Commit
- `.env` files
- `.env.local` 
- `node_modules/`
- `.vercel/`

### ✅ DO Commit
- `.env.example` (template only)
- `api/` folder
- `package.json` & `package-lock.json`
- All documentation
- `vercel.json`
- `.gitignore`

### 🔒 Security
- API key NEVER in code
- Use environment variables
- `.gitignore` prevents accidents
- Vercel stores secrets securely

## Quick Reference Commands

```bash
# Local Development
npm install              # Install dependencies
npm run dev             # Start dev server
node test-api.js        # Test API locally

# Git Commands
git init                # Initialize git repo
git add .               # Stage all files
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub

# Vercel Deployment
vercel login            # Login to Vercel
vercel                  # Deploy project
vercel logs [url]       # View deployment logs

# Docker (Optional)
docker-compose up       # Run with docker-compose
docker build -t pdf .   # Build image
docker run -p 3000:3000 pdf  # Run container
```

## File Counts

- **Total Files:** 20+
- **Configuration Files:** 8
- **API Endpoints:** 3
- **Documentation:** 6
- **Examples:** 5
- **Docker Files:** 2

## What's Next?

1. ✅ Understand structure (you're reading it!)
2. 📖 Read [QUICK_START.md](QUICK_START.md)
3. 🚀 Follow [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
4. 🌐 Deploy to Vercel
5. 🧪 Test endpoints
6. 🎉 Use in production!

---

**Questions?** Check:
- 📖 [README.md](README.md) - For API documentation
- 🚀 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - For deployment help
- 💡 [examples/](examples/) - For code examples
