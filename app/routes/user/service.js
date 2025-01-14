import cardRepo from "../../repositories/cardRepository.js";

const create = async (body) => {
  const { name, userId, grade, genre, price, count, description, imagePath } =
    body;

  // img upload 로직 넣기
  return await cardRepo.createCard({
    name,
    userId,
    grade,
    genre,
    price: parseInt(price),
    count: parseInt(count),
    description,
    imagePath,
  });
};

const getCards = async (userId) => {
  const cards = await cardRepo.findManyCards(userId);
  return cards;
};

const getMarketCards = async (userId) => {
  const marketCards = await cardRepo.findMarketCards(userId);
  return marketCards;
};

const service = {
  create,
  getCards,
  getMarketCards,
};

export default service;
