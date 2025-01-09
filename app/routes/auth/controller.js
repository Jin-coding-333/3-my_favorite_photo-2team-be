import express from "express";
import service from "./service.js";
import { httpState } from "../../../config/config.js";
import authMiddleware from "../../middlewares/auth.js";

const auth = express.Router();
auth.get("/user", authMiddleware.verifyAccessToken, async (req, res) => {
  try {
    const user = await service.getUser({ email: req.user.email });
    res.status(httpState.success.number).json({ ...user });
  } catch (err) {
    console.error(err);
  }
});

auth.post("/signup", (req, res) => {
  const { email, password, nickName } = req.body;
  try {
    service.signUp({
      email,
      password,
      nickName,
    });
    res.status(httpState.created.number).send("user created");
  } catch (err) {
    console.log(err);
  }
});

auth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await service.login({ email, password });
    const accessToken = await service.createToken(user);
    const refreshToken = await service.createToken(user, "refresh");
    res
      .status(httpState.success.number)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      })
      .json({ success: !!accessToken, accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(httpState.unauthorized.number).json({
      success: false,
    });
  }
});

auth.get("/logout", (req, res) => {
  console.log("logout", req.cookies);
  req.user = null;
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(httpState.success.number).send({ success: true });
});

export default auth;
