# 📋 Setup Checklist

Ikuti checklist ini untuk memastikan setup sudah benar sebelum deploy ke Vercel.

## ✅ Pre-Deployment Checklist

### Local Setup
- [ ] `npm install` - Install semua dependencies
- [ ] Copy `.env.example` ke `.env.local`
- [ ] Isi `PDF_ENDPOINT_API_KEY` di `.env.local` dengan API key PDFEndpoint Anda
- [ ] Run `npm run dev` dan test API bekerja dengan baik
- [ ] Test health endpoint: `curl http://localhost:3000/api/health`
- [ ] Test convert endpoint: `curl -X POST http://localhost:3000/api/convert ...`

### Git Setup
- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin https://github.com/username/pdfconverter.git`
- [ ] Push to GitHub: `git push -u origin main`

### PDFEndpoint Setup
- [ ] Verify API key valid di [PDFEndpoint Dashboard](https://app.pdfendpoint.com)
- [ ] Test API key locally dan berhasil
- [ ] Copy exact API key (tanpa spasi)

### Project Review
- [ ] Review `README.md` untuk dokumentasi lengkap
- [ ] Review `api/convert.js` untuk logika implementation
- [ ] Review `vercel.json` untuk Vercel configuration
- [ ] Check `.gitignore` includes `.env` files
- [ ] Check `.vercelignore` configured correctly

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All local tests passing
- [ ] Code committed ke Git
- [ ] No console errors locally

### Vercel Setup
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "Add New" → "Project"
- [ ] Connect GitHub account
- [ ] Select "pdfconverter" repository
- [ ] Click "Import"

### Environment Variables Setup (PENTING!)
- [ ] Pergi ke Project Settings
- [ ] Click "Environment Variables"
- [ ] Tambah `PDF_ENDPOINT_API_KEY`:
  - [ ] Key: `PDF_ENDPOINT_API_KEY`
  - [ ] Value: `pdfe_live_xxxxx...` (exact API key)
  - [ ] Pilih: Production, Preview, Development
  - [ ] Click "Save"
- [ ] Tambah `PDF_ENDPOINT_URL` (optional):
  - [ ] Key: `PDF_ENDPOINT_URL`
  - [ ] Value: `https://api.pdfendpoint.com/v1/convert`
  - [ ] Click "Save"

### Deploy Configuration
- [ ] Vercel auto-detects Node.js
- [ ] Vercel auto-detects serverless functions di `/api`
- [ ] Check "Build & Development" settings
- [ ] No special build command needed
- [ ] Click "Deploy"

### Post-Deployment
- [ ] Wait untuk deployment selesai
- [ ] Test health endpoint:
  ```bash
  curl https://your-project.vercel.app/api/health
  ```
- [ ] Test convert endpoint:
  ```bash
  curl -X POST https://your-project.vercel.app/api/convert \
    -H "Content-Type: application/json" \
    -d '{"url": "https://example.com"}' \
    --output test.pdf
  ```
- [ ] Check file `test.pdf` berhasil dibuat dan valid
- [ ] Check Vercel Deployments view untuk logs

## ✅ Post-Deployment Verification

### Functionality Test
- [ ] ✅ Health check endpoint works
- [ ] ✅ URL conversion works
- [ ] ✅ HTML conversion works (if needed)
- [ ] ✅ PDF output valid and readable
- [ ] ✅ Error handling works (test with bad URL)
- [ ] ✅ Response headers correct (Content-Type: application/pdf)

### Monitoring Setup
- [ ] ✅ Check Vercel Analytics dashboard
- [ ] ✅ Enable error notifications (Settings → Notifications)
- [ ] ✅ Monitor response times
- [ ] ✅ Monitor error rates

### Security Review
- [ ] ✅ API key NOT in code or git history
- [ ] ✅ Environment variables configured in Vercel
- [ ] ✅ `.gitignore` includes `.env` files
- [ ] ✅ HTTPS enabled (default)
- [ ] ✅ Consider adding rate limiting (optional)

## ✅ Optional - Blob Storage Setup

- [ ] Go to project Storage tab
- [ ] Click "Create" → "Blob"
- [ ] Complete setup wizard
- [ ] Vercel auto-creates `BLOB_READ_WRITE_TOKEN`
- [ ] Update API to use `convert-with-storage.js`
- [ ] Install: `npm install @vercel/blob`
- [ ] Redeploy
- [ ] Test blob storage functionality

## ✅ Optional - Custom Domain Setup

- [ ] Owning a domain name
- [ ] Go to Vercel project Settings → Domains
- [ ] Add your domain
- [ ] Configure DNS (follow Vercel instructions)
- [ ] Wait for DNS propagation (5-30 minutes)
- [ ] Test endpoint works on custom domain

## 🔧 Troubleshooting

### Deployment Failed?
- [ ] Check build logs in Vercel dashboard
- [ ] Check function logs: "Functions" tab di deployment
- [ ] Verify `package.json` valid JSON
- [ ] Verify `vercel.json` valid JSON

### API Returns 500 Error?
- [ ] Check environment variables di Vercel Settings
- [ ] Verify API key is correct
- [ ] Try redeploy: "Deployments" → 3dots → "Redeploy"
- [ ] Check Vercel logs untuk error details

### PDF Not Generated?
- [ ] Check URL/HTML valid
- [ ] Verify API key works di PDFEndpoint dashboard
- [ ] Check API response untuk error message
- [ ] Try contacting PDFEndpoint support

### Deployment Takes Too Long?
- [ ] Normal deployment takes 1-2 minutes
- [ ] First deployment longer (builds layers)
- [ ] Check if dependencies unusually large
- [ ] Remove unnecessary dependencies

## 📞 Support Resources

- 📖 [README.md](README.md) - Full documentation
- 🚀 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Detailed deployment guide
- ⚡ [QUICK_START.md](QUICK_START.md) - Quick reference
- 💡 [examples/](examples/) - Code examples
- 📡 [API_RESPONSES.md](API_RESPONSES.md) - API response examples
- 🔗 [Vercel Docs](https://vercel.com/docs)
- 🔗 [PDFEndpoint Docs](https://docs.pdfendpoint.com)

## ✨ Success!

Jika semua checklist sudah selesai, API Anda siap production! 🎉

Akses endpoint di:
```
https://your-project-name.vercel.app/api/convert
```

Happy coding! 🚀
