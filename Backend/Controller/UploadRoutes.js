const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs").promises;
const rateLimit = require("express-rate-limit");
const adminAuth = require("../Middleware/adminAuth");

// Rate limiter for upload endpoint
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: "Too many upload requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Use memory storage for multer to process images before saving
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .png, or .webp files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 15 }, // Increased to 15MB to handle large uploads before compression
});

router.post(
  "/api/admin/upload-image",
  uploadLimiter,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file was uploaded." });
      }

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `image-${uniqueSuffix}.webp`;
      const outputPath = path.join("public/uploads", filename);

      // Ensure uploads directory exists
      await fs.mkdir("public/uploads", { recursive: true });

      // Compress and convert image to WebP format
      await sharp(req.file.buffer)
        .resize(1600, 1600, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      const relativePath = `/uploads/${filename}`.replace(/\\/g, "/");
      const fullUrl = `${process.env.API_BASE_URL}${relativePath}`;

      res.json({
        success: true,
        message: "File uploaded and optimized successfully",
        filePath: fullUrl,
      });
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).json({
        success: false,
        message: "Error processing image",
        error: error.message
      });
    }
  }
);

module.exports = router;
