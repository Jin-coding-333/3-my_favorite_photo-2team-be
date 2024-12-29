import dotenv from "dotenv";
dotenv.config();
export const { PORT, JWT_SECRET, ORIGIN } = process.env;
export const httpState = {
  success: {
    number: 200,
    string: "ok",
  },
  created: {
    number: 201,
    string: "created",
  },
  accepted: {
    number: 202,
    string: "accepted",
  },
  badRequest: {
    number: 400,
    string: "bad request",
  },
  unauthorized: {
    number: 401,
    string: "unauthorized",
  }, // 권한없음
  notFound: {
    number: 404,
    string: "not found",
  },
  serverErorr: {
    number: 500,
    string: "server error",
  },
  notImplemented: {
    number: 501,
    string: "not implemented",
  }, //구현되지않음
  badGateway: {
    number: 502,
    string: "bad gateway",
  },
};
