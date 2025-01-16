import { expressjwt } from "express-jwt";
import { JWT_SECRET } from "../../config/config.js";

const verifyRefreshToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.refreshToken ,
});

const verifyAccessToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const refreshTokenChk = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) return next();
  console.log("token 없음");
  res.send("");
};

const authMiddleware = {
  verifyAccessToken,
  verifyRefreshToken,
  refreshTokenChk,
};
export default authMiddleware;
