import { readFile } from "fs/promises";
import prisma from "../app/utils/prisma.js";

const userMock = JSON.parse(
  await readFile(new URL("./users.json", import.meta.url))
);
const cardMock = JSON.parse(
  await readFile(new URL("./cards.json", import.meta.url))
);

async function main() {
  try {
    // 기존 데이터 삭제
    await prisma.card.deleteMany();
    await prisma.user.deleteMany();

    // 사용자 데이터 생성
    console.log("사용자 데이터 생성중입니다...");
    await prisma.user.createMany({
      data: userMock,
    });

    // 생성된 사용자 조회
    const users = await prisma.user.findMany();

    // 카드 데이터에 userId 추가
    const cardsWithUserId = cardMock.map(card => ({
      ...card,
      userId: users[Math.floor(Math.random() * users.length)].id
    }));

    // 카드 데이터 생성
    console.log("카드 데이터 생성중입니다...");
    await prisma.card.createMany({
      data: cardsWithUserId,
    });

    console.log("시딩 완료✅!");
  } catch (err) {
    console.error("에러 발생⚠️:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
