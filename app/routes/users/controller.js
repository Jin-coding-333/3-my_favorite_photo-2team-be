import express from "express";
import service from "./service.js";
import { httpState } from "../../../config/config.js";

const users = express.Router();
users.get("/data", async (req, res) => {
  const { email } = req.user;
  const user = await service.getUser({ email });

  res.status(httpState.success).json({ ...user });
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
  const accessToken = service.createToken(user);
  const refreshToken = service.createToken(user, "refresh");
  res.status(httpState.success.number).json({ accessToken, refreshToken });
});

export default users;
