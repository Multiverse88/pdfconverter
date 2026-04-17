const axios = require("axios");

export default async function handler(req, res) {
  // Hanya terima POST request
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
      margin_right = "2cm"
    } = req.body;

    // Validasi input - harus ada URL atau HTML
    if (!url && !html) {
      return res.status(400).json({ 
        error: "Diperlukan 'url' atau 'html' dalam request body" 
      });
    }

    // Ambil API key dari environment variables
    const apiKey = process.env.PDF_ENDPOINT_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "PDF_ENDPOINT_API_KEY tidak dikonfigurasi" 
      });
    }

    const pdfEndpointUrl = process.env.PDF_ENDPOINT_URL || "https://api.pdfendpoint.com/v1/convert";

    // Persiapkan data untuk PDFEndpoint API
    const conversionData = {
      sandbox,
      orientation,
      page_size,
      margin_top,
      margin_bottom,
      margin_left,
      margin_right
    };

    // Tambahkan URL atau HTML ke data
    if (url) {
      conversionData.url = url;
    } else if (html) {
      conversionData.html = html;
    }

    // Konfigurasi axios request ke PDFEndpoint
    const options = {
      method: "POST",
      url: pdfEndpointUrl,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      data: conversionData,
      // Timeout 60 detik
      timeout: 60000,
      responseType: "arraybuffer" // Terima response sebagai binary
    };

    // Hubungi PDFEndpoint API
    const response = await axios.request(options);

    // Set response headers untuk PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    // Kirim PDF ke client
    return res.status(200).send(response.data);
  } catch (error) {
    console.error("Error converting HTML to PDF:", error.message);

    // Handle error dari PDFEndpoint API
    if (error.response) {
      return res.status(error.response.status).json({
        error: "Error from PDF conversion service",
        details: error.response.data?.message || error.message
      });
    }

    // Handle network errors
    return res.status(500).json({
      error: "Failed to convert HTML to PDF",
      details: error.message
    });
  }
}
