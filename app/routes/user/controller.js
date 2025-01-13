import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import { httpState } from "../../../config/config.js";
import service from "./service.js";

const user = express.Router();

user
  .get("/my-cards", authMiddleware.verifyAccessToken, async (req, res) => {
    try {
      const { userId } = req.user;
      const cards = await service.getCards(userId);
      res.status(httpState.success.number).json({
        data: cards,
      });
    } catch (err) {
      res.status(httpState.badRequest.number).send(err);
    }
  })
  .post("/my-cards", async (req, res) => {
    try {
      await service.create(req.body);
      res.status(httpState.success.number).json({
        success: true,
      });
    } catch (err) {
      res.status(httpState.badRequest.number).send(err);
    }
  });

user.get("/my-cards/sales", async (req, res) => {
  try {
  } catch (err) {}
});

user.get("/my-cards/exchange", async (req, res) => {
  try {
  } catch (err) {}
});

user.get("/profile", async (req, res) => {
  try {
  } catch (err) {}
});
user.get("/check-email", async (req, res) => {
  try {
  } catch (err) {}
});
user.get("/check-nickname", async (req, res) => {
  try {
  } catch (err) {}
});
export default user;
