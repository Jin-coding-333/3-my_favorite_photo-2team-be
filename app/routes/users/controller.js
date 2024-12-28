import express from "express";
import service from "./service.js";
import { httpState } from "../../../config/config.js";

const users = express.Router();
users.get("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await service.getUser({ email, password });

  res.status(httpState.success).json({ ...user });
});

users.post("/signup", async (req, res) => {});

export default users;
