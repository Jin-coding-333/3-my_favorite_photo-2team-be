import { readFile } from "fs/promises";
import prisma from "../app/utils/prisma.js";

const userMock = JSON.parse(
  await readFile(new URL("./users.json", import.meta.url))
);
const cardMock = JSON.parse(
  await readFile(new URL("./cards.json", import.meta.url))
);

async function userAdd(mockData) {
  const user = await prisma.user.findMany({});
  return [...mockData].map((v) => {
    const random = Math.floor(Math.random() * user.length);
    return { ...v, userId: user[random].id };
  });
}

/// user 의 비밀번호는 1234입니다.
async function main() {
  try {
    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: userMock,
    });
    const card = await userAdd(cardMock);
    await prisma.card.deleteMany();
    await prisma.card.createMany({
      data: card,
    });
  } catch (err) {
    console.error(err);
  }
}
main();
