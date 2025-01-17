import cardRepo from "../../repositories/cardRepository.js";
import userRepo from "../../repositories/userRepository.js";

async function getUser({ email }) {
  const findUser = await userRepo.findByEmail(email);
  return userRepo.userDataFilter(findUser);
}

const updateUser = async ({ email, data }) => {
  const update = await userRepo.updateUser({ email, data });
  if (!!update) return true;
  return false;
};

const create = async (body) => {
  const {
    name,
    userId,
    grade,
    genre,
    price,
    totalQuantity,
    description,
    imagePath,
  } = body;

  return await cardRepo.createCard({
    name,
    userId,
    grade,
    genre,
    price: parseInt(price),
    remainingQuantity: parseInt(totalQuantity),
    totalQuantity: parseInt(totalQuantity),
    description,
    imagePath,
  });
};

const getCards = async (userId) => {
  const cards = await cardRepo.findManyCards(userId);
  return cards;
};

const getShopCards = async (userId) => {
  const shopCards = await cardRepo.findShopCards(userId);
  return shopCards;
};

const getExchangeCards = async (userId) => {
  const cards = await cardRepo.findExchangeCards(userId);
  return cards;
};

const eventReset = async () => {
  await userRepo.eventReset();
};

const service = {
  create,
  getCards,
  getShopCards,
  getExchangeCards,
  eventReset,
  getUser,
  updateUser,
};

export default service;
