import prisma from "./prisma";

async function create() {}

async function findByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      data: {
        email,
      },
    });
    return user;
  } catch (err) {
    console.error(`userRepo.js(${findByEmail.name})`, err);
  }
}

function userDataFilter(user) {
  const { passowrd, ...rest } = user;
  return rest;
}

const userRepo = {
  findByEmail,
  userDataFilter,
};
export default userRepo;
