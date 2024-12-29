import { JWT_SECRET } from "../../../config/config.js";
import hash from "../../lib/hash.js";
import throwError from "../../lib/trhowError.js";
import userRepo from "../../lib/userRepo.js";
// import auth from "../../middlewares/auth.js";
import jwt from "jsonwebtoken";

async function getUser({ email }) {
  try {
    const findUser = await userRepo.findByEmail(email);
    return userRepo.userDataFilter(findUser);
  } catch (err) {
    console.error(err);
  }
}

async function verifyPassword(password, password2) {
  const match = await hash.compare(password, password2);
  if (!match) throwError();
  else return;
}

async function login({ email, password }) {
  const findUser = await userRepo.findByEmail(email);
  verifyPassword(password, findUser.password);
  return userRepo.userDataFilter(findUser);
}

async function createToken(user, type) {
  if (user) {
    const payload = { user: user.email };
    const option = { expiresIn: type === "refresh" ? "2w" : "1h" };

    return jwt.sign(payload, JWT_SECRET, option);
  } else return null;
}

function signUp({ email, password, nickName }) {
  userRepo.createUser({ email, password, nickName });
}

const service = { getUser, verifyPassword, signUp, login, createToken };
export default service;
