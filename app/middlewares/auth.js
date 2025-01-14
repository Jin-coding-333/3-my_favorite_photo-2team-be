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

const authMiddleware = { verifyAccessToken, verifyRefreshToken };
export default authMiddleware;
