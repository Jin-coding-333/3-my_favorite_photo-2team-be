import express from "express";
/** Router을 import 해주세요 */
import auth from "./auth/controller.js";
import user from "./user/controller.js";
import shop from "./Shop/controller.js";

const router = express.Router();

/** 여기에 Router 추가해주세요 */
router.use("/auth", auth);
router.use("/user", user);
router.use("/shop", shop);

export default router;
