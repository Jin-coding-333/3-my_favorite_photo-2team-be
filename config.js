export const { PORT } = process.env;
export const httpCode = {
  success: 200,
  created: 201,
  accepted: 202,
  badRequert: 400,
  unauthorized: 401, // 권한없음
  notFound: 404,
  serverErorr: 500,
  notImplemented: 501, //구현되지않음
  badGateway: 502,
};
