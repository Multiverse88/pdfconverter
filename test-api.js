#!/usr/bin/env node

/**
 * Script untuk test API convert locally
 * Usage: node test-api.js [url]
 * 
 * Example:
 * node test-api.js
 * node test-api.js https://example.com
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const API_URL = "http://localhost:3000/api/convert";
const OUTPUT_FILE = path.join(__dirname, "test-output.pdf");

const testUrl = process.argv[2] || "https://en.wikipedia.org/wiki/PDF";

const requestData = {
  url: testUrl,
  sandbox: true,
  orientation: "vertical",
  page_size: "A4",
  margin_top: "2cm",
  margin_bottom: "2cm",
  margin_left: "2cm",
  margin_right: "2cm"
};

console.log("🚀 Testing PDF Converter API");
console.log(`📎 URL: ${testUrl}`);
console.log(`🔗 API Endpoint: ${API_URL}`);
console.log("");

const startTime = Date.now();

fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(requestData)
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.arrayBuffer();
  })
  .then(buffer => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    fs.writeFileSync(OUTPUT_FILE, Buffer.from(buffer));
    const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);
    
    console.log(`✅ Success!`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📊 File size: ${fileSize} KB`);
    console.log(`💾 Saved to: ${OUTPUT_FILE}`);
  })
  .catch(error => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error(`❌ Error (${duration}s):`, error.message);
    process.exit(1);
  });
