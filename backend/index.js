const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

// Routes
const authRoutes = require("./routes/auth");
const snippetRoutes = require("./routes/snippets");
const commentRoutes = require("./routes/comments");
const changeHistoryRoutes = require("./routes/changeHistory");
const keyRoutes = require("./routes/key");

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/snippets", authMiddleware, snippetRoutes);
app.use("/api/comments", authMiddleware, commentRoutes);
app.use("/api/changeHistory", authMiddleware, changeHistoryRoutes);
app.use("/api/key", keyRoutes);

// Health check / test
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express 🎉" });
});

// ---------------------------
// Export for Netlify Functions
// ---------------------------
if (process.env.NETLIFY) {
  module.exports.handler = serverless(app);
} else {
  // ---------------------------
  // Run normally (local dev)
  // ---------------------------
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}

const cors = require("cors");

app.use(cors({
  origin: [
    "https://your-frontend.netlify.app",  // Netlify site
    "http://localhost:5173"               // frontend dev server
  ],
  credentials: true
}));

const CLIENT_URL = process.env.CLIENT_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
