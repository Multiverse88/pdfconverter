/**
 * Contoh: Convert HTML string ke PDF menggunakan Node.js
 */

const axios = require("axios");
const fs = require("fs");

const API_URL = "https://your-project.vercel.app/api/convert";

// HTML string yang ingin dikonversi
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .header {
      background-color: #007bff;
      color: white;
      padding: 20px;
      margin-bottom: 20px;
    }
    .content {
      padding: 20px;
    }
    .footer {
      border-top: 1px solid #ddd;
      padding-top: 10px;
      margin-top: 20px;
      text-align: center;
      color: #666;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Invoice #12345</h1>
  </div>
  
  <div class="content">
    <h2>Detail Pelanggan</h2>
    <p><strong>Nama:</strong> John Doe</p>
    <p><strong>Email:</strong> john@example.com</p>
    <p><strong>Tanggal:</strong> 2024-01-15</p>
    
    <h2>Detail Pembelian</h2>
    <table>
      <thead>
        <tr>
          <th>Produk</th>
          <th>Jumlah</th>
          <th>Harga</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Laptop</td>
          <td>1</td>
          <td>Rp 10.000.000</td>
          <td>Rp 10.000.000</td>
        </tr>
        <tr>
          <td>Mouse</td>
          <td>2</td>
          <td>Rp 200.000</td>
          <td>Rp 400.000</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Total: Rp 10.400.000</strong></p>
  </div>
  
  <div class="footer">
    <p>Terima kasih atas pembelian Anda!</p>
  </div>
</body>
</html>
`;

async function convertHtmlToPdf() {
  try {
    const response = await axios.post(API_URL, {
      html: htmlContent,
      sandbox: true,
      page_size: "A4",
      orientation: "vertical",
      margin_top: "1.5cm",
      margin_bottom: "1.5cm",
      margin_left: "1.5cm",
      margin_right: "1.5cm"
    }, {
      responseType: "arraybuffer"
    });

    // Simpan ke file
    fs.writeFileSync("invoice.pdf", response.data);
    console.log("✅ Invoice PDF berhasil dibuat: invoice.pdf");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

convertHtmlToPdf();
