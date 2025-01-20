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

  let uniqueId = imagePath.split("/uploads")[1].split(".")[0];
  uniqueId = uniqueId.split("\\").join("");
  uniqueId = uniqueId.split("/").join("");
  console.log(uniqueId);
  for (let i = 0; i < parseInt(totalQuantity); i++) {
    await cardRepo.createCard({
      uniqueId,
      name,
      userId,
      grade,
      genre,
      price: parseInt(price),
      description,
      imagePath,
    });
  }
  return true;
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
