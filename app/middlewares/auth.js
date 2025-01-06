import { expressjwt } from "express-jwt";
import { JWT_SECRET } from "../../config/config.js";

const verifyAccessToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const authMiddleware = { verifyAccessToken };
export default authMiddleware;
