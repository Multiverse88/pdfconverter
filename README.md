# PDF Converter API

API untuk mengkonversi HTML ke PDF menggunakan layanan PDFEndpoint. Proyek ini di-deploy di Vercel sebagai serverless function.

## 🚀 Fitur

- ✅ Konversi URL ke PDF
- ✅ Konversi HTML string ke PDF
- ✅ Customizable margins dan page size
- ✅ Orientation support (portrait/landscape)
- ✅ Sandbox mode untuk testing
- ✅ Error handling yang robust
- ✅ Deployed di Vercel

## 📋 Requirements

- Node.js 18.x atau lebih tinggi
- Account di [PDFEndpoint](https://pdfendpoint.com) dengan API key
- Account di [Vercel](https://vercel.com)

## 🔧 Setup Local Development

### 1. Clone dan install dependencies

```bash
# Install dependencies
npm install
```

### 2. Setup environment variables

Copy `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` dan masukkan API key PDFEndpoint Anda:

```
PDF_ENDPOINT_API_KEY=pdfe_live_xxxxxxxxxxxx
PDF_ENDPOINT_URL=https://api.pdfendpoint.com/v1/convert
```

### 3. Run development server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 📡 API Endpoints

### POST /api/convert

Endpoint untuk mengkonversi HTML/URL ke PDF.

**Request Body:**

```json
{
  "url": "https://example.com",
  "html": null,
  "sandbox": true,
  "orientation": "vertical",
  "page_size": "A4",
  "margin_top": "2cm",
  "margin_bottom": "2cm",
  "margin_left": "2cm",
  "margin_right": "2cm"
}
```

**Parameters:**

| Parameter | Type | Required | Default | Deskripsi |
|-----------|------|----------|---------|-----------|
| `url` | string | ✓* | - | URL untuk dikonversi ke PDF |
| `html` | string | ✓* | - | HTML string untuk dikonversi ke PDF |
| `sandbox` | boolean | ✗ | true | Mode sandbox untuk testing |
| `orientation` | string | ✗ | vertical | Portrait/Landscape |
| `page_size` | string | ✗ | A4 | Ukuran halaman (A4, Letter, dll) |
| `margin_top` | string | ✗ | 2cm | Margin atas |
| `margin_bottom` | string | ✗ | 2cm | Margin bawah |
| `margin_left` | string | ✗ | 2cm | Margin kiri |
| `margin_right` | string | ✗ | 2cm | Margin kanan |

*Salah satu dari `url` atau `html` harus ada

**Response:**

- **Success (200):** File PDF (binary)
- **Error (400):** Missing required parameters
- **Error (500):** Server error

### GET /api/health

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "message": "PDF Converter API is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 📝 Contoh Penggunaan

### JavaScript (Node.js / Fetch API)

```javascript
// Konversi URL ke PDF
const response = await fetch('https://your-api.vercel.app/api/convert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://en.wikipedia.org/wiki/PDF',
    sandbox: true,
    page_size: 'A4'
  })
});

const pdfBuffer = await response.arrayBuffer();
// Simpan atau prosess PDF
```

### cURL

```bash
curl -X POST https://your-api.vercel.app/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "sandbox": true
  }' \
  --output result.pdf
```

### Python

```python
import requests

response = requests.post(
    'https://your-api.vercel.app/api/convert',
    json={
        'url': 'https://example.com',
        'sandbox': True,
        'page_size': 'A4'
    }
)

with open('output.pdf', 'wb') as f:
    f.write(response.content)
```

## 🚀 Deploy ke Vercel

### 1. Push ke Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/pdfconverter.git
git push -u origin main
```

### 2. Connect ke Vercel

**Opsi A: Menggunakan Vercel CLI**

```bash
npm i -g vercel
vercel login
vercel
```

**Opsi B: Menggunakan Vercel Dashboard**

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import GitHub repository
4. Click "Deploy"

### 3. Setup Environment Variables di Vercel

1. Buka project settings di Vercel
2. Pergi ke "Environment Variables"
3. Tambahkan variables:
   - `PDF_ENDPOINT_API_KEY`: API key dari PDFEndpoint
   - `PDF_ENDPOINT_URL`: URL API PDFEndpoint (opsional)

### 4. Hasil Deployment

API akan tersedia di: `https://your-project-name.vercel.app/api/convert`

### Setup Vercel Storage (Blob Storage)

Untuk menyimpan PDF hasil konversi:

#### 1. Enable Vercel Blob Storage

```bash
npm install @vercel/blob
```

#### 2. Update API endpoint (optional)

Jika Anda ingin menyimpan PDF:

```javascript
// api/convert.js - tambahkan di bagian response
import { put } from '@vercel/blob';

// Simpan PDF ke Blob Storage
const filename = `pdf_${Date.now()}.pdf`;
const blob = await put(filename, response.data, {
  access: 'public'
});

// Return dengan URL untuk download
return res.status(200).json({
  success: true,
  url: blob.url,
  downloadUrl: `${blob.url}?download`
});
```

#### 3. Setup di Vercel Dashboard

1. Pergi ke "Storage" → "Blob"
2. Click "Create Database"
3. Follow instruksi setup

#### 4. Add Token ke Environment Variables

Di Vercel Dashboard, environment variables akan otomatis ditambahkan setelah setup Blob Storage.

## 🧪 Testing

### Test Health Check

```bash
curl http://localhost:3000/api/health
```

### Test PDF Conversion (Local)

```bash
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://en.wikipedia.org/wiki/PDF",
    "sandbox": true,
    "page_size": "A4"
  }' \
  --output test.pdf
```

## 📊 Directory Structure

```
pdfconverter/
├── api/
│   ├── convert.js          # Main API endpoint untuk konversi
│   └── health.js           # Health check endpoint
├── vercel.json             # Vercel configuration
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── .env.local              # Local development (jangan commit)
├── .gitignore              # Git ignore file
└── README.md               # Documentation
```

## 🔒 Security Notes

⚠️ **PENTING:**
- Jangan commit `.env.local` atau `.env` file ke git
- Gunakan `.env.example` sebagai template
- Jaga API key Anda tetap rahasia
- Dalam production, gunakan environment variables di Vercel Dashboard
- Pertimbangkan rate limiting untuk production

## 🐛 Troubleshooting

### Error: "PDF_ENDPOINT_API_KEY tidak dikonfigurasi"
- Pastikan environment variable sudah di-set di Vercel Dashboard
- Untuk local, pastikan `.env.local` memiliki nilai yang benar

### Error: "Method not allowed"
- Pastikan request menggunakan method POST
- Check Content-Type header adalah `application/json`

### Error konversi dari PDFEndpoint
- Verify API key Anda valid
- Check URL atau HTML yang dikirim valid
- Lihat response details untuk error message dari PDFEndpoint

### Timeout error
- PDF yang kompleks mungkin memerlukan waktu lebih lama
- Default timeout adalah 60 detik
- Untuk file besar, pertimbangkan async processing

## 📚 Referensi

- [PDFEndpoint Documentation](https://docs.pdfendpoint.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [Node.js HTTP Handlers](https://vercel.com/docs/functions/serverless-functions/node-js)

## 📝 License

MIT

## 👥 Support

Untuk pertanyaan atau issue, silakan buka GitHub issue.

---

**Dibuat dengan ❤️ untuk konversi PDF yang mudah**
