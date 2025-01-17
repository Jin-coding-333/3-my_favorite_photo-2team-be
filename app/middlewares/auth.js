import { expressjwt } from "express-jwt";
import { JWT_SECRET } from "../../config/config.js";

const verifyRefreshToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.refreshToken,
});

const verifyAccessToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const refreshTokenChk = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const { authorization } = req.headers;
  const accessToken = authorization;
  if (refreshToken && !!!accessToken) return next();
};
const accessTokenChk = async (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization;
  if (accessToken) next();
};

const authMiddleware = {
  verifyAccessToken,
  verifyRefreshToken,
  refreshTokenChk,
  accessTokenChk,
};
export default authMiddleware;
