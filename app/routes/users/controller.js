import express from "express";
import prisma from "../../lib/prisma.js";
import service from "./service.js";

const users = express.Router();
users.get("/", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
});

export default users;
