import { JWT_SECRET } from "../../../config/config.js";
import hash from "../../utils/hash.js";
import throwError from "../../utils/trhowError.js";
import userRepo from "../../repositories/userRepository.js";
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
  try {
    const match = await hash.compare(password, password2);
    if (!!!match) throwError("errorMsg", 401);
    return match;
  } catch (err) {
    console.error(err);
  }
}

async function login({ email, password }) {
  const findUser = await userRepo.findByEmail(email);
  const next = await verifyPassword(password, findUser.password);
  if (next) return userRepo.userDataFilter(findUser);
  else return null;
}

async function createToken(user, type) {
  if (user) {
    const payload = { email: user.email, userId: user.id };
    const option = { expiresIn: type === "refresh" ? "2w" : "1h" };

    return jwt.sign(payload, JWT_SECRET, option);
  } else return null;
}

async function refreshToken({ email, refreshToken }) {
  const user = await userRepo.findByEmail(email);
  if (!user || !refreshToken) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }
  return createToken(user);
}

async function signUp({ email, password, nickName }) {
  const signup = await userRepo.createUser({ email, password, nickName });
  if (signup) {
    return signup;
  }
}

const service = {
  getUser,
  verifyPassword,
  signUp,
  login,
  createToken,
  refreshToken,
};
export default service;
