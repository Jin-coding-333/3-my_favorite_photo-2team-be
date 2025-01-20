import express from "express";
import service from "./service.js";
import { httpState } from "../../../config/config.js";
import authMiddleware from "../../middlewares/auth.js";

const auth = express.Router();

auth.get(
  "/user",
  authMiddleware.accessTokenChk,
  authMiddleware.verifyAccessToken,
  async (req, res) => {
    try {
      const user = await service.getUser({ email: req.user.email });
      res.status(httpState.success.number).json({ user });
    } catch (err) {
      console.error(err);
    }
  }
);

auth.post("/signup", async (req, res, next) => {
  const { email, password, nickName } = req.body;
  const signup = await service.signUp({
    email,
    password,
    nickName,
  });
  let msg = "";
  if (signup && signup.code === "P2002") {
    switch (signup.target) {
      case "email":
        msg = "이메일 중복입니다.";
        break;
      case "nickName":
        msg = "닉네임 중복입니다.";
        break;
    }
    res.status(401).json({ success: false, msg });
    return;
  }
  msg = "회원가입을 축하드립니다.";
  res.status(httpState.created.number).json({ success: true, msg });
});

auth.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log("login");
  try {
    const user = await service.login({ email, password });
    const accessToken = await service.createToken(user);
    const refreshToken = await service.createToken(user, "refresh");
    res
      .status(httpState.success.number)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      })
      .json({ success: !!accessToken, accessToken });
  } catch (err) {
    next(err);
    res.status(httpState.unauthorized.number).json({
      success: false,
    });
  }
});

auth.post(
  "/refresh",
  authMiddleware.refreshTokenChk,
  authMiddleware.verifyRefreshToken,
  async (req, res, next) => {
    try {
      console.log("refresh");
      const { refreshToken } = req.cookies;
      const { email } = req.auth;
      const accessToken = await service.refreshToken({ email, refreshToken });
      res.status(httpState.success.number).json({ success: true, accessToken });
    } catch (err) {
      next(err);
      res.status(httpState.badRequest.number).json({ success: false });
    }
  }
);

auth.get(
  "/logout",
  authMiddleware.accessTokenChk,
  authMiddleware.verifyAccessToken,
  async (req, res) => {
    const { email } = req.user;
    await service.logout({ email });
    req.user = null;
    res.clearCookie("refreshToken");
    res.status(httpState.success.number).send({ success: true });
  }
);

export default auth;
