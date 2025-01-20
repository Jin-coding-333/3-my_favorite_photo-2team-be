import express from "express";
import exchangeController from "../exchange/controller.js";

const router = express.Router();
router.use("/", exchangeController);

export default router;
