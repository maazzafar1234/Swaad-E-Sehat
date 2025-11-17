const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const rateLimit = require("express-rate-limit");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many uploads, try again later.",
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 15 },
  fileFilter(req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

router.post(
  "/api/admin/upload-image",
  uploadLimiter,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const optimizedImageBuffer = await sharp(req.file.buffer)
        .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      imagekit.upload(
        {
          file: optimizedImageBuffer,
          fileName: Date.now() + ".webp",
          folder: "admin_uploads",
        },
        (err, result) => {
          if (err) {
            console.error("ImageKit Error:", err);
            return res.status(500).json({
              success: false,
              message: "Image upload failed",
              error: err.message,
            });
          }

          return res.json({
            success: true,
            message: "Image uploaded successfully",
            filePath: result.url,
          });
        }
      );
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
