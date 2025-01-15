import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import { httpState } from "../../../config/config.js";
import service from "./service.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
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
  .post(
    "/my-cards",
    authMiddleware.verifyAccessToken,
    upload.single("imagePath"),
    async (req, res, next) => {
      try {
        await service.create({ ...req.body, imagePath: `/${req.file.path}` });
        res.status(httpState.success.number).json({
          success: true,
        });
      } catch (err) {
        next(err);
        res.status(httpState.badRequest.number).send(err);
      }
    }
  );

user.get(
  "/my-cards/sales",
  authMiddleware.verifyAccessToken,
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const cards = await service.getShopCards(userId);
      res.status(httpState.success.number).json({ ...cards });
    } catch (err) {
      next(err);
      res.status(httpState.badRequest.number).send({ err });
    }
  }
);

user.get(
  "/my-cards/exchange",
  authMiddleware.verifyAccessToken,
  async (req, res, next) => {
    try {
      const user = req.user;
    } catch (err) {
      next(err);
      res.status(httpState.badRequest.number).send({ err });
    }
  }
);

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
