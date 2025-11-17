require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./Config/db.js");
const authRoutes = require("./Controller/auth.js");
const checkoutRoutes = require("./Controller/CreateOrder.js");
const VerifyOrderRoutes = require("./Controller/VerifyOrder.js");
const DashboardRoutes = require("./Controller/dashboard.js");
const ContactController = require("./Controller/Contact.js");
const productRoutes = require("./Controller/ProductRoutes");
const adminProductRoutes = require("./Controller/AdminProductRoutes");
const adminAuth = require("./Middleware/adminAuth.js");
const adminDataRoutes = require("./Controller/AdminDataRoutes");
const uploadRoutes = require("./Controller/UploadRoutes");
// const { initializeCleanupJob } = require('./job/ImageCleanupJob');

const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;

const corsOptions = {
  origin: [
    "https://www.swaadesehat.in",
    "https://swaadesehat.in",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://api.swaadesehat.in;"
  );

  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  next();
});

app.use(
  express.static("public", {
    maxAge: "1y",
    etag: true,
    lastModified: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");

  pool.query("SELECT 1 + 1 AS solution", (error, results) => {
    if (error) throw error;
    console.log("The solution is: ", results[0].solution);
  });
});

app.use("/auth", authRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/status", VerifyOrderRoutes);
app.use("/stats", DashboardRoutes);
app.use("/c", ContactController);
app.use("/dynamic", productRoutes);

app.use(adminAuth, adminProductRoutes);
app.use(adminAuth, adminDataRoutes);
app.use(adminAuth, uploadRoutes);

// initializeCleanupJob();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
