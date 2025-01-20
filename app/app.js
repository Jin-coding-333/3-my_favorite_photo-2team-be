import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { ORIGIN, PORT } from "../config/config.js";
import cookieParser from "cookie-parser";
import fs from "fs";

const uploadsDir = "uploads";

// 폴더가 없으면 생성
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("uploads 폴더가 생성되었습니다.");
}

const app = express();
app.use(
  cors({
    // origin: ORIGIN,
    origin: ["http://localhost:3000", "https://my-favorite-photo.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}번으로 시작`);
});
