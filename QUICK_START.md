# 🚀 Quick Start Guide

## 5 Menit Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local dan masukkan API key PDFEndpoint Anda
```

### 3. Run Development Server
```bash
npm run dev
# Server berjalan di http://localhost:3000
```

### 4. Test API
```bash
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' \
  --output test.pdf
```

## Deploy ke Vercel (2 Menit)

### Menggunakan Vercel CLI
```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Vercel akan memberikan URL seperti:
# https://your-project-name.vercel.app
```

### Setup Environment di Vercel
1. Buka Vercel Dashboard → Project
2. Settings → Environment Variables
3. Tambah: `PDF_ENDPOINT_API_KEY = your-api-key`
4. Redeploy project

## Contoh Penggunaan API

### JavaScript/Node.js
```javascript
const response = await fetch('https://your-api.vercel.app/api/convert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com',
    page_size: 'A4'
  })
});
const pdf = await response.arrayBuffer();
```

### Python
```python
import requests

response = requests.post(
    'https://your-api.vercel.app/api/convert',
    json={'url': 'https://example.com'}
)

with open('output.pdf', 'wb') as f:
    f.write(response.content)
```

### cURL
```bash
curl -X POST https://your-api.vercel.app/api/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' \
  --output output.pdf
```

## Features

| Fitur | Deskripsi |
|-------|-----------|
| 🔗 URL to PDF | Konversi website langsung ke PDF |
| 📝 HTML to PDF | Konversi HTML string ke PDF |
| 📄 Page Customization | Set size, orientation, margins |
| ☁️ Serverless | Deploy di Vercel dalam 1 klik |
| 💾 Optional Storage | Simpan PDF ke Vercel Blob Storage |
| 🏥 Health Check | Monitor status endpoint |

## File Structure

```
pdfconverter/
├── api/
│   ├── convert.js                  # Main converter
│   ├── health.js                   # Health check
│   └── convert-with-storage.js     # With Blob Storage
├── examples/                        # Usage examples
├── package.json                     # Dependencies
├── vercel.json                      # Vercel config
├── .env.example                     # Environment template
└── DEPLOYMENT_GUIDE.md              # Detailed guide
```

## Common Issues

| Issue | Solution |
|-------|----------|
| API Key Error | Check `.env.local` atau Environment Variables di Vercel |
| Timeout | PDF kompleks perlu waktu lebih lama |
| CORS Error | Update API headers (lihat DEPLOYMENT_GUIDE.md) |

## More Info

- 📖 [Full Documentation](README.md)
- 🚀 [Deployment Guide](DEPLOYMENT_GUIDE.md)
- 💡 [Examples](examples/)
- 📚 [PDFEndpoint Docs](https://docs.pdfendpoint.com)

## Need Help?

1. Check [examples](examples/) folder
2. Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
3. Check Vercel logs: `vercel logs`
4. Verify API key di PDFEndpoint dashboard

---

**Ready to go?** → `npm run dev` 🎯
