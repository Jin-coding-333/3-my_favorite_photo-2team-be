import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { ORIGIN, PORT } from "../config/config.js";
import cookieParser from "cookie-parser";
import fs from "fs";
const app = express();

const uploadsDir = "uploads";

// 폴더가 없으면 생성
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("uploads 폴더가 생성되었습니다.");
}

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  cors({
    origin: ["*"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
  })
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}번으로 시작`);
});
