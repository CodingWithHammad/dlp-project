import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS Setup (Frontend: localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies or auth headers
  })
);

// ✅ Test Route
app.get("/", (_, res) => {
  res.send("Server is running correctly...");
});
// ✅ Routes
app.use("/api/auth", authRoutes);
// ✅ DB + Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
  
});
