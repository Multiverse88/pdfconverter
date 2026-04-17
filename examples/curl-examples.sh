#!/bin/bash
# Contoh penggunaan API dengan cURL

API_URL="https://your-project.vercel.app/api/convert"

echo "📋 Contoh-contoh penggunaan PDF Converter API dengan cURL"
echo ""

# Example 1: Convert URL to PDF
echo "=========================================="
echo "Example 1: Convert URL to PDF"
echo "=========================================="
echo "Command:"
echo "curl -X POST $API_URL \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"url\": \"https://example.com\", \"sandbox\": true}' \\"
echo "  --output result.pdf"
echo ""

# Example 2: Convert with custom settings
echo "=========================================="
echo "Example 2: Convert dengan custom settings"
echo "=========================================="
echo "Command:"
echo "curl -X POST $API_URL \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{
  \"url\": \"https://en.wikipedia.org/wiki/PDF\",
  \"sandbox\": true,
  \"orientation\": \"horizontal\",
  \"page_size\": \"A4\",
  \"margin_top\": \"1cm\",
  \"margin_bottom\": \"1cm\",
  \"margin_left\": \"1cm\",
  \"margin_right\": \"1cm\"
}' \\"
echo "  --output wikipedia.pdf"
echo ""

# Example 3: Convert HTML
echo "=========================================="
echo "Example 3: Convert HTML String"
echo "=========================================="
echo "Command:"
echo "curl -X POST $API_URL \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{
  \"html\": \"<html><body><h1>Hello PDF!</h1></body></html>\",
  \"sandbox\": true
}' \\"
echo "  --output document.pdf"
echo ""

# Example 4: Health check
echo "=========================================="
echo "Example 4: Health Check"
echo "=========================================="
echo "Command:"
echo "curl -X GET https://your-project.vercel.app/api/health"
echo ""

# Example 5: Save to file dan display info
echo "=========================================="
echo "Example 5: Save ke file dengan info"
echo "=========================================="
echo "Command:"
echo "curl -X POST $API_URL \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"url\": \"https://example.com\"}' \\"
echo "  --output output.pdf \\"
echo "  -w '\nStatus: %{http_code} | Size: %{size_download} bytes | Time: %{time_total}s\n'"
echo ""

# Example 6: With verbose output
echo "=========================================="
echo "Example 6: Verbose output untuk debugging"
echo "=========================================="
echo "Command:"
echo "curl -v -X POST $API_URL \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"url\": \"https://example.com\"}' \\"
echo "  --output output.pdf"
echo ""

# Example 7: With custom headers
echo "=========================================="
echo "Example 7: Dengan custom headers"
echo "=========================================="
echo "Command:"
echo "curl -X POST $API_URL \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'User-Agent: MyApp/1.0' \\"
echo "  -d '{\"url\": \"https://example.com\"}' \\"
echo "  --output output.pdf"
echo ""

echo "=========================================="
echo "Tips:"
echo "=========================================="
echo "1. Ganti 'your-project' dengan nama project Vercel Anda"
echo "2. Gunakan --output untuk menyimpan ke file"
echo "3. Gunakan -v untuk verbose output (debugging)"
echo "4. Gunakan -w untuk menampilkan info response"
echo "5. Pastikan Content-Type header adalah 'application/json'"
echo ""
