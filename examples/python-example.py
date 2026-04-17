#!/usr/bin/env python3
"""
Contoh: Convert URL ke PDF menggunakan Python dengan requests
"""

import requests
import sys
from pathlib import Path

API_URL = "https://your-project.vercel.app/api/convert"

def convert_url_to_pdf(url, output_file="output.pdf"):
    """
    Convert URL to PDF
    
    Args:
        url (str): Website URL to convert
        output_file (str): Output PDF file path
    """
    print(f"🚀 Converting {url} to PDF...")
    
    payload = {
        "url": url,
        "sandbox": True,
        "orientation": "vertical",
        "page_size": "A4",
        "margin_top": "2cm",
        "margin_bottom": "2cm",
        "margin_left": "2cm",
        "margin_right": "2cm"
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(API_URL, json=payload, headers=headers, timeout=60)
        response.raise_for_status()
        
        # Save PDF
        with open(output_file, "wb") as f:
            f.write(response.content)
        
        file_size = Path(output_file).stat().st_size / 1024
        print(f"✅ PDF berhasil dibuat: {output_file}")
        print(f"📊 File size: {file_size:.2f} KB")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Error: {e}")
        return False


def convert_html_to_pdf(html_content, output_file="output.pdf"):
    """
    Convert HTML string to PDF
    
    Args:
        html_content (str): HTML content to convert
        output_file (str): Output PDF file path
    """
    print(f"🚀 Converting HTML to PDF...")
    
    payload = {
        "html": html_content,
        "sandbox": True,
        "orientation": "vertical",
        "page_size": "A4",
        "margin_top": "1.5cm",
        "margin_bottom": "1.5cm",
        "margin_left": "1.5cm",
        "margin_right": "1.5cm"
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(API_URL, json=payload, headers=headers, timeout=60)
        response.raise_for_status()
        
        # Save PDF
        with open(output_file, "wb") as f:
            f.write(response.content)
        
        file_size = Path(output_file).stat().st_size / 1024
        print(f"✅ PDF berhasil dibuat: {output_file}")
        print(f"📊 File size: {file_size:.2f} KB")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Error: {e}")
        return False


if __name__ == "__main__":
    # Example 1: Convert URL
    print("=" * 50)
    print("Example 1: Convert URL to PDF")
    print("=" * 50)
    convert_url_to_pdf("https://en.wikipedia.org/wiki/PDF", "wikipedia.pdf")
    
    # Example 2: Convert HTML
    print("\n" + "=" * 50)
    print("Example 2: Convert HTML to PDF")
    print("=" * 50)
    
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            p { line-height: 1.6; }
        </style>
    </head>
    <body>
        <h1>Hello PDF!</h1>
        <p>Ini adalah contoh konversi HTML ke PDF.</p>
        <p>Anda bisa menggunakan HTML dan CSS untuk styling.</p>
    </body>
    </html>
    """
    
    convert_html_to_pdf(html, "example.pdf")
