import express from "express";
import service from "./service.js";
import { httpState } from "../../../config/config.js";

const users = express.Router();
users.get("/data", async (req, res) => {
  const { email } = req.user;
  const user = await service.getUser({ email });

  res.status(httpState.success.number).json({ ...user });
});

users.post("/signup", (req, res) => {
  const { email, password, nickName } = req.body;
  service.signUp({
    email,
    password,
    nickName,
  });
  res.status(httpState.created.number).send("user created");
});

users.post("/login", async (req, res) => {
  const { email, password } = req.body;
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
    .json({ accessToken, refreshToken });
});

export default users;
