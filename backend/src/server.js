import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import bookRouter from "./routes/bookRoute.js";
import userRouter from "./routes/userRoute.js";
import logRouter from "./routes/logRoute.js";

dotenv.config();
await connectDB();

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "https://mini-library-system.onrender.com")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(express.json({ limit: "100kb" }));
app.use("/uploads", express.static("uploads"));

app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
app.use("/", logRouter);

app.get("/", (req, res) => {
  res.send(
    'Go to main site: <a href="https://mini-library-manager.onrender.com" target="_blank" rel="noopener noreferrer">Hello World</a>'
  );
});

app.use((err, req, res, next) => {
  if (err?.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS: Origin not allowed" });
  }

  if (err?.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }

  if (err?.message === "Only image uploads are allowed") {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Server error" });
});

app.listen(8080, () => console.log("Server running on port 8080"));
