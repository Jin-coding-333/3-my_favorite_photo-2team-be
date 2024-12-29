import { expressjwt } from "express-jwt";
import { JWT_SECRET } from "../../config/config";

const verifyAccessToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const auth = { verifyAccessToken };
export default auth;
