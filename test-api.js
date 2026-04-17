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
    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
    console.log(`📋 Response Headers:`);
    console.log(`   Content-Type: ${response.headers.get("content-type")}`);
    console.log(`   Content-Length: ${response.headers.get("content-length")}`);
    console.log("");
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    // Check if response is actually PDF
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("pdf")) {
      console.warn(`⚠️  Warning: Content-Type is "${contentType}", expected "application/pdf"`);
    }
    
    return response.arrayBuffer();
  })
  .then(buffer => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    // Validate PDF signature
    const view = new Uint8Array(buffer);
    const pdfSignature = String.fromCharCode(...view.slice(0, 4));
    
    if (pdfSignature !== "%PDF") {
      console.error(`❌ Error: File signature is not PDF!`);
      console.error(`   File starts with: ${pdfSignature}`);
      console.error(`   First 100 bytes: ${String.fromCharCode(...view.slice(0, 100))}`);
      process.exit(1);
    }
    
    fs.writeFileSync(OUTPUT_FILE, Buffer.from(buffer));
    const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);
    
    console.log(`✅ Success!`);
    console.log(`📄 PDF Signature: ${pdfSignature} ✓`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📊 File size: ${fileSize} KB`);
    console.log(`💾 Saved to: ${OUTPUT_FILE}`);
  })
  .catch(error => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error(`❌ Error (${duration}s):`, error.message);
    process.exit(1);
  });
