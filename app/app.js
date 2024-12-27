import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import { PORT } from "../config.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}번으로 시작`);
});
