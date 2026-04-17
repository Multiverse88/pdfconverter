const axios = require("axios");
import { put } from "@vercel/blob";

/**
 * Advanced converter dengan Vercel Blob Storage support
 * Endpoint ini menyimpan PDF yang dihasilkan ke Vercel Blob Storage
 * dan mengembalikan URL untuk download/access
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      url,
      html,
      sandbox = true,
      orientation = "vertical",
      page_size = "A4",
      margin_top = "2cm",
      margin_bottom = "2cm",
      margin_left = "2cm",
      margin_right = "2cm",
      saveToStorage = true // Flag untuk menyimpan ke Blob Storage
    } = req.body;

    if (!url && !html) {
      return res.status(400).json({ 
        error: "Diperlukan 'url' atau 'html' dalam request body" 
      });
    }

    const apiKey = process.env.PDF_ENDPOINT_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "PDF_ENDPOINT_API_KEY tidak dikonfigurasi" 
      });
    }

    const pdfEndpointUrl = process.env.PDF_ENDPOINT_URL || "https://api.pdfendpoint.com/v1/convert";

    const conversionData = {
      sandbox,
      orientation,
      page_size,
      margin_top,
      margin_bottom,
      margin_left,
      margin_right
    };

    if (url) {
      conversionData.url = url;
    } else if (html) {
      conversionData.html = html;
    }

    const options = {
      method: "POST",
      url: pdfEndpointUrl,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      data: conversionData,
      timeout: 60000,
      responseType: "arraybuffer"
    };

    const response = await axios.request(options);

    // Jika saveToStorage diaktifkan dan BLOB_READ_WRITE_TOKEN tersedia
    if (saveToStorage && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const filename = `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.pdf`;
        const blob = await put(filename, response.data, {
          access: "public"
        });

        return res.status(200).json({
          success: true,
          message: "PDF berhasil dikonversi dan disimpan",
          url: blob.url,
          downloadUrl: `${blob.url}?download`,
          filename: filename,
          size: response.data.length
        });
      } catch (storageError) {
        console.error("Blob Storage error:", storageError.message);
        // Fallback: kirim PDF langsung jika Blob Storage gagal
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
        return res.status(200).send(response.data);
      }
    } else {
      // Mode default: kirim PDF langsung
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      return res.status(200).send(response.data);
    }
  } catch (error) {
    console.error("Error:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: "Error from PDF conversion service",
        details: error.response.data?.message || error.message
      });
    }

    return res.status(500).json({
      error: "Failed to convert HTML to PDF",
      details: error.message
    });
  }
}
