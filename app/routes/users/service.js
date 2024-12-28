import throwError from "../../lib/trhowError";
import userRepo from "../../lib/userRepo";

async function getUser({ email, password }) {
  const findUser = await userRepo.findByEmail(email);
  verifyPassword(findUser.password, password);
  return userRepo.userDataFilter(findUser);
}

function verifyPassword(password, password2) {
  if (password !== password2) throwError();
  else return;
}
const service = { getUser, verifyPassword };

export default service;
