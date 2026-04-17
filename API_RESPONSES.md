# API Response Examples

## Success Responses

### Health Check - Success
**Request:**
```bash
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "PDF Converter API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Convert URL - Success
**Request:**
```bash
POST /api/convert
Content-Type: application/json

{
  "url": "https://example.com",
  "sandbox": true,
  "page_size": "A4"
}
```

**Response (200 OK):**
```
[Binary PDF Data]

Headers:
Content-Type: application/pdf
Content-Disposition: attachment; filename=converted.pdf
Cache-Control: no-cache, no-store, must-revalidate
```

### Convert HTML - Success
**Request:**
```bash
POST /api/convert
Content-Type: application/json

{
  "html": "<html><body><h1>Hello</h1></body></html>",
  "sandbox": true,
  "page_size": "A4"
}
```

**Response (200 OK):**
```
[Binary PDF Data]

Headers:
Content-Type: application/pdf
Content-Disposition: attachment; filename=converted.pdf
```

## Error Responses

### Method Not Allowed (405)
**Request:**
```bash
GET /api/convert
```

**Response:**
```json
{
  "error": "Method not allowed"
}
```

### Missing Required Parameters (400)
**Request:**
```bash
POST /api/convert
Content-Type: application/json

{}
```

**Response:**
```json
{
  "error": "Diperlukan 'url' atau 'html' dalam request body"
}
```

### Missing API Configuration (500)
**Response:**
```json
{
  "error": "PDF_ENDPOINT_API_KEY tidak dikonfigurasi"
}
```

### PDFEndpoint Service Error (e.g., 400)
**Request:**
```bash
POST /api/convert
Content-Type: application/json

{
  "url": "invalid-url",
  "sandbox": true
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Error from PDF conversion service",
  "details": "Invalid URL format"
}
```

### Network/Connection Error (500)
**Response:**
```json
{
  "error": "Failed to convert HTML to PDF",
  "details": "timeout of 60000ms exceeded"
}
```

## Response with Blob Storage (Optional)

### Convert and Save to Blob Storage
**Request:**
```bash
POST /api/convert-with-storage
Content-Type: application/json

{
  "url": "https://example.com",
  "saveToStorage": true,
  "sandbox": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "PDF berhasil dikonversi dan disimpan",
  "url": "https://xxxxxx.public.blob.vercel-storage.com/pdf_1705331400000_abc123def.pdf",
  "downloadUrl": "https://xxxxxx.public.blob.vercel-storage.com/pdf_1705331400000_abc123def.pdf?download",
  "filename": "pdf_1705331400000_abc123def.pdf",
  "size": 125456
}
```

## Status Codes Reference

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | PDF generated successfully |
| 400 | Bad Request | Missing url/html parameter |
| 405 | Method Not Allowed | Using GET instead of POST |
| 500 | Server Error | API key not configured |
| 504 | Gateway Timeout | Conversion took too long |

## Content-Type Reference

Request headers yang diperlukan:
```
Content-Type: application/json
```

Response headers untuk PDF:
```
Content-Type: application/pdf
Content-Disposition: attachment; filename=document.pdf
Cache-Control: no-cache, no-store, must-revalidate
```

## Testing Response Examples

### Using JavaScript Fetch API
```javascript
const response = await fetch('https://your-api.vercel.app/api/convert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    sandbox: true
  })
});

if (response.ok) {
  // Success - binary PDF data
  const blob = await response.blob();
  console.log('PDF size:', blob.size);
  
  // Save PDF
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.pdf';
  a.click();
} else {
  // Error
  const error = await response.json();
  console.error('Error:', error.error);
}
```

### Using axios (Node.js)
```javascript
try {
  const response = await axios.post('https://your-api.vercel.app/api/convert', {
    url: 'https://example.com',
    sandbox: true
  }, {
    responseType: 'arraybuffer'
  });
  
  // Binary PDF in response.data
  console.log('PDF size:', response.data.length);
  
  // Save to file
  fs.writeFileSync('output.pdf', response.data);
} catch (error) {
  console.error('Error:', error.response?.data || error.message);
}
```

### Using Python requests
```python
response = requests.post(
    'https://your-api.vercel.app/api/convert',
    json={
        'url': 'https://example.com',
        'sandbox': True
    },
    timeout=60
)

if response.status_code == 200:
    # Success - binary PDF data
    with open('output.pdf', 'wb') as f:
        f.write(response.content)
    print(f"PDF size: {len(response.content)} bytes")
else:
    # Error
    error = response.json()
    print(f"Error: {error['error']}")
```

## Rate Limiting Notes

Vercel's limits per deployment:
- Memory: 512MB
- Timeout: 60 seconds (Pro: 900 seconds)
- Payload size: 6MB

Large PDF conversions might need:
- Pro plan untuk extended timeout
- Split into multiple smaller requests
- Use Blob Storage untuk caching results

## Debugging

Enable verbose logging:
```bash
# Local development
export DEBUG=*
npm run dev

# Or set in .env.local
DEBUG=*
```

Check Vercel logs:
```bash
vercel logs https://your-project.vercel.app/api/convert
```

---

**Pro Tip:** Always check your PDFEndpoint dashboard untuk debug API key issues!
