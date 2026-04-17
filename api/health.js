export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    message: "PDF Converter API is running",
    timestamp: new Date().toISOString()
  });
}
