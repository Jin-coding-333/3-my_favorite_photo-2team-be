// import { readFile } from "fs/promises";
// import prisma from "../repo/prisma.js";

// const userMock = JSON.parse(await readFile(new URL("./mock/user.json", import.meta.url)));

// async function userAdd(mockData) {
//   const user = await prisma.user.findMany({});
//   return [...mockData].map((v) => {
//     const random = Math.floor(Math.random() * user.length);
//     return { ...v, userUuid: user[random].uuid };
//   });
// }
// async function main() {
//   try {
//     await prisma.user.deleteMany();
//     await prisma.user.createMany({
//       data: userMock,
//     });
//     await userAdd(mockData);
//   } catch (err) {
//     console.error(err);
//   }
// }
// main();
