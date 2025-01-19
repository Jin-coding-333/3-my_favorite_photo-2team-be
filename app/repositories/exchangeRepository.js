import prisma from "../utils/prisma.js";

// 교환 생성
const createExchange = async ({ requesterId, cardId, targetCard }) => {
  return await prisma.exchange.create({
    data: {
      requesterId, // 교환 요청자 ID
      cardId, // 요청자가 제공할 카드 ID
      targetCard, // 요청받는 대상 카드 ID
    },
  });
};

// 교환 상태 업데이트
const updateExchangeStatus = async (exchangeId, action) => {
  const status = action === "accept" ? "accepted" : "refused"; // 상태를 결정
  return await prisma.exchange.update({
    where: { id: parseInt(exchangeId) },
    data: { status }, // 'status' 필드는 Prisma 스키마에서 Exchange 모델에 정의된 상태 필드
  });
};

// 교환 삭제
const deleteExchange = async (exchangeId) => {
  return await prisma.exchange.delete({
    where: { id: parseInt(exchangeId, 10) || 0 }, // 기본값 0 설정
  });
};

export default {
  createExchange,
  updateExchangeStatus,
  deleteExchange,
};
