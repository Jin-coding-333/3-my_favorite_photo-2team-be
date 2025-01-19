import express from "express";
import exchangeController from "../exchange/controller.js";

const router = express.Router();
router.use("/cards", exchangeController);

export default router;
