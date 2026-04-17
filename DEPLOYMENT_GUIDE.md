# Panduan Deployment ke Vercel

## Prasyarat

- Git repository (GitHub, GitLab, atau Bitbucket)
- Account Vercel (gratis)
- Account PDFEndpoint dengan API key

## Langkah-langkah Deployment

### 1. Persiapan Repository Git

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - PDF Converter API"

# Tambahkan remote repository
git remote add origin https://github.com/username/pdfconverter.git
git branch -M main
git push -u origin main
```

### 2. Setup Vercel Account

1. Buka [vercel.com](https://vercel.com)
2. Click "Sign Up" atau "Log In"
3. Pilih GitHub/GitLab/Bitbucket untuk authentication
4. Authorize Vercel

### 3. Import Project ke Vercel

#### Opsi A: Menggunakan Vercel CLI (Cepat)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Opsi B: Menggunakan Vercel Dashboard (UI)

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select Git Provider (GitHub/GitLab/Bitbucket)
4. Select repository "pdfconverter"
5. Click "Import"
6. Vercel akan auto-detect settings
7. Click "Deploy"

### 4. Configure Environment Variables

**Di Vercel Dashboard:**

1. Buka project yang sudah di-deploy
2. Pergi ke tab "Settings"
3. Click "Environment Variables" di sidebar
4. Tambahkan variables:

```
PDF_ENDPOINT_API_KEY = pdfe_live_xxxxxxxxxxxxxxxx
PDF_ENDPOINT_URL = https://api.pdfendpoint.com/v1/convert  (optional)
```

5. Pilih environments:
   - ✓ Production
   - ✓ Preview
   - ✓ Development (optional)

6. Click "Save"

7. **Redeploy** untuk apply environment variables:
   - Go to "Deployments"
   - Click 3 dots menu pada deployment terbaru
   - Pilih "Redeploy"

### 5. Verify Deployment

Setelah deployment selesai, Vercel akan memberikan URL:

```
https://your-project-name.vercel.app
```

Test endpoint:

```bash
# Health check
curl https://your-project-name.vercel.app/api/health

# Convert URL (ganti YOUR_PROJECT dengan nama project Anda)
curl -X POST https://your-project-name.vercel.app/api/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' \
  --output test.pdf
```

## Setup Vercel Blob Storage (Optional)

### 1. Enable Vercel Blob Storage

Di Vercel Dashboard:

1. Buka project
2. Pergi ke "Storage" tab
3. Click "Create" → "Blob"
4. Ikuti setup wizard
5. Vercel akan membuat dan mengatur `BLOB_READ_WRITE_TOKEN` automatically

### 2. Update API untuk menggunakan Blob Storage

```bash
# Install @vercel/blob package
npm install @vercel/blob
```

Update `api/convert.js` atau gunakan `api/convert-with-storage.js` yang sudah disediakan.

### 3. Redeploy

Push changes ke git:

```bash
git add .
git commit -m "Add Blob Storage support"
git push origin main
```

Vercel akan auto-deploy.

## Custom Domain (Optional)

### Add Custom Domain

1. Di Vercel Dashboard, buka project
2. Pergi ke "Settings" → "Domains"
3. Click "Add Domain"
4. Masukkan domain Anda
5. Ikuti DNS configuration instructions

### Update DNS Records

```
# Untuk domain apex (example.com):
Type: A
Name: @
Value: 76.76.19.20

# Untuk subdomain (api.example.com):
Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

## Monitoring & Logs

### View Logs

```bash
# Using Vercel CLI
vercel logs https://your-project.vercel.app/api/convert

# Di Vercel Dashboard:
# 1. Buka project
# 2. Click "Deployments"
# 3. Select deployment
# 4. Click "Functions" tab untuk function logs
```

### Performance Monitoring

Di Vercel Dashboard:

1. Buka project
2. Click "Analytics" tab
3. Monitor:
   - Response times
   - Error rates
   - Bandwidth usage
   - Request count

## Troubleshooting

### Environment Variables Tidak Loaded

```bash
# Pastikan variables sudah ter-set:
1. Di Vercel Dashboard, check "Settings" → "Environment Variables"
2. Pastikan Production environment ter-check
3. Redeploy: "Deployments" → 3dots menu → "Redeploy"
```

### API Key Error

```
Error: PDF_ENDPOINT_API_KEY tidak dikonfigurasi
```

Solusi:
1. Pastikan API key valid di PDFEndpoint dashboard
2. Copy-paste exact API key (tanpa spasi)
3. Redeploy project

### Timeout Error

Error ini terjadi jika PDF conversion membutuhkan waktu > 30 detik (Vercel's limit)

Solusi:
- Gunakan URL/HTML yang lebih sederhana
- Split besar file jadi banyak request kecil
- Pertimbangkan upgrade ke Pro plan untuk higher limits

### CORS Error (di frontend)

Jika frontend di domain berbeda:

Update `api/convert.js`:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

if (req.method === 'OPTIONS') {
  return res.status(200).end();
}
```

## Maintenance & Updates

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Push changes
git add package*.json
git commit -m "Update dependencies"
git push origin main
```

### Rollback Deployment

Di Vercel Dashboard:

1. Pergi ke "Deployments"
2. Click pada previous deployment yang stabil
3. Click "Promote to Production"

## Performance Tips

1. **Optimize HTML**: Gunakan clean, minimal HTML
2. **Cache Results**: Pertimbangkan caching PDF results
3. **Monitor Limits**: Vercel free tier 100GB/month bandwidth
4. **Rate Limiting**: Implementasi rate limiting untuk production
5. **Database**: Untuk track conversions, gunakan Vercel Postgres

## Security Best Practices

1. ✅ Use environment variables untuk API keys
2. ✅ Enable HTTPS (default di Vercel)
3. ✅ Implement rate limiting
4. ✅ Validate input (check `api/convert.js`)
5. ✅ Use POST (bukan GET) untuk sensitive operations
6. ✅ Log dan monitor API usage
7. ✅ Keep dependencies updated

## Next Steps

1. ✅ Deploy ke Vercel
2. ✅ Setup environment variables
3. ✅ Test endpoints
4. ✅ Setup monitoring
5. ✅ Add custom domain (optional)
6. ✅ Setup Blob Storage (optional)
7. ✅ Implement rate limiting
8. ✅ Add API documentation

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Vercel Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [PDFEndpoint API Docs](https://docs.pdfendpoint.com)

---

Happy Deploying! 🎉
