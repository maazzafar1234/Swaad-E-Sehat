const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const adminAuth = require("../Middleware/adminAuth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

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
  limits: { fileSize: 1024 * 1024 * 5 },
});

router.post(
  "/api/admin/upload-image",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file was uploaded." });
    }

    const relativePath = `/uploads/${req.file.filename}`.replace(/\\/g, "/");

    const fullUrl = `${process.env.API_BASE_URL}${relativePath}`;

    res.json({
      success: true,
      message: "File uploaded successfully",
      filePath: fullUrl,
    });
  }
);

module.exports = router;
