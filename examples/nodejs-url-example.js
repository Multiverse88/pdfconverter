/**
 * Contoh: Convert URL ke PDF menggunakan Node.js
 */

const axios = require("axios");
const fs = require("fs");

const API_URL = "https://your-project.vercel.app/api/convert";

async function convertUrlToPdf() {
  try {
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
      responseType: "arraybuffer"
    });

    // Simpan ke file
    fs.writeFileSync("output.pdf", response.data);
    console.log("✅ PDF berhasil dibuat: output.pdf");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

convertUrlToPdf();
