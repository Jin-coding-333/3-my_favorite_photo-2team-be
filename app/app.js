import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { ORIGIN, PORT } from "../config/config.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ORIGIN || "*",
    credentials: true,
  })
);
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`PORT: ${PORT}번으로 시작`);
});
