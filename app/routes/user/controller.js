import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import { httpState } from "../../../config/config.js";
import service from "./service.js";
import multer from "multer";
import cron from "node-cron";
import { getTime } from "../../utils/date.js";

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
    const { userId } = req.user;
    const cards = await service.getCards(userId);
    res.status(httpState.success.number).json({
      data: cards,
    });
  })
  .post(
    "/my-cards",
    authMiddleware.verifyAccessToken,
    upload.single("imagePath"),
    async (req, res, next) => {
      await service.create({ ...req.body, imagePath: `/${req.file.path}` });
      res.status(httpState.success.number).json({
        success: true,
      });
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
    const { userId } = req.user;
    const cards = await service.getExchangeCards(userId);
    res.status(201).json({ data: cards });
  }
);

user
  .get("/point", authMiddleware.verifyAccessToken, async (req, res) => {
    const { email } = req.user;
    const user = await service.getUser({ email });
    if (!!!user) return res.status(401).send(null);
    res.status(201).send(user.event);
  })
  .post("/point", authMiddleware.verifyAccessToken, async (req, res) => {
    const { email } = req.user;
    const point = Math.floor(Math.random() * 9) + 1;
    const now = new Date();
    const update = await service.updateUser({
      email,
      data: {
        event: now,
        point: {
          increment: point,
        },
      },
    });
    if (!update) return res.status(401).send(false);

    res.status(200).send(true);
  });

/** 분 마다 이벤트 상태 변경 코드 */
cron.schedule("* * * * *", async () => {
  const date = new Date();
  try {
    console.log(`Current Time ${getTime()} :`, "Event Reset");
    await service.eventReset();
  } catch (err) {
    console.error("스케쥴 err", err);
  }
});

// user.get("/profile", async (req, res) => {
//   try {
//   } catch (err) {}
// });
// user.get("/check-email", async (req, res) => {
//   try {
//   } catch (err) {}
// });
// user.get("/check-nickname", async (req, res) => {
//   try {
//   } catch (err) {}
// });
export default user;
