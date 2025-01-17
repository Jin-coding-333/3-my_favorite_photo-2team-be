import prisma from "../utils/prisma.js";

const msg = (fncName) => `cardRepo.js(${fncName})`;
async function findManyCards(userId) {
  try {
    const cards = await prisma.card.findMany({
      where: {
        userId,
      },
    });
    // console.log(cards, userId);

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

async function findShopCards(userId) {
  try {
    return await prisma.shop.findMany({
      where: {
        userId,
      },
    });
  } catch (err) {
    console.error(msg("findShopCards"), err);
  }
}

async function findExchangeCards(requesterId) {
  try {
    const cards = await prisma.exchange.findMany({
      where: {
        requesterId,
      },
    });
    return cards;
  } catch (err) {
    return {
      code: err.code,
    };
  }
}
const cardRepo = {
  findManyCards,
  createCard,
  findShopCards,
  findExchangeCards,
};
export default cardRepo;
