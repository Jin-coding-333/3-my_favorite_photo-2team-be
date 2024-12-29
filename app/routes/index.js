import express from "express";
/** Router을 import 해주세요 */
import users from "./users/controller.js";

const router = express.Router();

/** 여기에 Router 추가해주세요 */
router.use("/users", users);

export default router;
