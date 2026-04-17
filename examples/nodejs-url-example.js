/**
 * Contoh: Convert URL ke PDF menggunakan Node.js
 * PENTING: Handle response sebagai binary / arraybuffer
 */

const axios = require("axios");
const fs = require("fs");

const API_URL = "https://your-project.vercel.app/api/convert";

async function convertUrlToPdf() {
  try {
    console.log("🚀 Starting PDF conversion...");
    
    const response = await axios.post(API_URL, {
      url: "https://en.wikipedia.org/wiki/PDF",
      sandbox: true,
      page_size: "A4",
      orientation: "vertical",
      margin_top: "2cm",
      margin_bottom: "2cm",
      margin_left: "2cm",
      margin_right: "2cm"
    }, {
      responseType: "arraybuffer",  // ⚠️ PENTING: Set sebagai arraybuffer
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 60000
    });

    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📋 Content-Type: ${response.headers['content-type']}`);
    console.log(`📦 Data Type: ${typeof response.data}, isBuffer: ${Buffer.isBuffer(response.data)}`);

    // Validasi PDF signature
    if (!Buffer.isBuffer(response.data)) {
      response.data = Buffer.from(response.data);
    }

    const pdfSignature = response.data.slice(0, 4).toString('ascii');
    console.log(`🔍 PDF Signature: ${pdfSignature}`);

    if (pdfSignature !== "%PDF") {
      console.error("❌ Error: Response is not a valid PDF!");
      console.error(`   Data starts with: ${response.data.slice(0, 100).toString()}`);
      return false;
    }

    // Simpan ke file
    fs.writeFileSync("output.pdf", response.data);
    const fileSizeKB = (response.data.length / 1024).toFixed(2);
    
    console.log(`✅ PDF berhasil dibuat: output.pdf`);
    console.log(`📊 File size: ${fileSizeKB} KB`);
    return true;
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data?.toString?.() || error.response.data);
    }
    return false;
  }
}

convertUrlToPdf();
