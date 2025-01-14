import prisma from "../utils/prisma.js";

const msg = (fncName) => `cardRepo.js(${fncName})`;
async function findManyCards(userId) {
  try {
    const cards = await prisma.card.findMany({
      where: {
        userId,
      },
    });
    return cards;
  } catch (err) {
    console.error(msg("findManycards"), err);
  }
}

async function createCard(body) {
  try {
    return await prisma.card.create({
      data: body,
    });
  } catch (err) {
    console.error(msg("createCard"), err);
  }
}

async function findMarketCards(userId) {
  try {
    return await prisma.shop.findMany({
      where: {
        userId,
      },
    });
  } catch (err) {
    console.error(msg("findMarketCards"), err);
  }
}
const cardRepo = {
  findManyCards,
  createCard,
  findMarketCards,
};
export default cardRepo;
