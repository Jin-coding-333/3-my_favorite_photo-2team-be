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
    console.log(err);
    return {
      code: err.code,
      target: err.meta.target[0],
    };
  }
}

async function updateUser({ email, data }) {
  try {
    const updateUser = await prisma.user.update({
      where: {
        email,
      },
      data: { ...data },
    });
    return updateUser;
  } catch (err) {
    return { code: err.code };
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
  const { password, ...rest } = user;
  return rest;
}

async function eventReset() {
  try {
    await prisma.user.updateMany({
      where: {
        event: true,
      },
      data: {
        event: false,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

const userRepo = {
  findByEmail,
  userDataFilter,
  createUser,
  eventReset,
  updateUser,
};
export default userRepo;
