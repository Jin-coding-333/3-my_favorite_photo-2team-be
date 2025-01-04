import hash from "../utils/hash.js";
import prisma from "../utils/prisma.js";

const msg = (fncName) => `userRepo.js(${fncName})`;
async function createUser({ email, password, nickName }) {
  try {
    const hashPw = await hash.hashValue(password);
    await prisma.user.create({
      data: {
        email,
        password: hashPw,
        nickName,
      },
    });
  } catch (err) {
    console.error(msg("createUser"), err);
  }
}

async function findByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (err) {
    console.error(msg("findByEmail"), err);
  }
}

function userDataFilter(user) {
  const { passowrd, ...rest } = user;
  return rest;
}

const userRepo = {
  findByEmail,
  userDataFilter,
  createUser,
};
export default userRepo;
