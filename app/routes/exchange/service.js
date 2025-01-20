import { httpState } from "../../../config/config.js";

const service = {
  // 교환 생성
  createExchange: async ({ shopId, cardId, targetCard, userId }) => {
    if (!shopId || !cardId || !targetCard || !userId) {
      throw {
        status: httpState.badRequest.number,
        message: "필수 값이 누락되었습니다.",
      };
    }

    try {
      // 교환 요청 생성
      const exchange = await prisma.exchange.create({
        data: {
          requesterId: userId,
          cardId,
          targetCard,
          shop: { connect: { id: shopId } },
        },
      });
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { nickName: true },
      });
      if (!user) {
        throw {
          status: httpState.serverErorr.number,
          message: "유저를 찾을 수 없습니다.",
        };
      }
      const notificationContent = `${user.nickName}님이 새로운 교환 요청을 보냈습니다.`;
      await prisma.notification.create({
        data: {
          content: notificationContent,
          userId: userId,
        },
      });
      return exchange;
    } catch (error) {
      throw { status: httpState.serverErorr.number, message: "교환 생성 실패" };
    }
  },

  // 교환 상태 업데이트
  updateExchange: async ({ exchangeId, action }) => {
    if (
      !exchangeId ||
      isNaN(parseInt(exchangeId)) ||
      !action ||
      !["accept", "refuse"].includes(action)
    ) {
      throw {
        status: httpState.badRequest.number,
        message: "잘못된 요청입니다.",
      };
    }

    try {
      const exchange = await prisma.exchange.update({
        where: { id: parseInt(exchangeId) },
        data: {
          status: action === "accept" ? "accepted" : "refused",
        },
      });
      const user = await prisma.user.findUnique({
        where: { id: exchange.requesterId },
        select: { nickName: true },
      });
      if (!user) {
        throw {
          status: httpState.serverErorr.number,
          message: "유저를 찾을 수 없습니다.",
        };
      }
      const notificationContent =
        action === "accept"
          ? `${user.nickName}님이 교환 요청을 승인했습니다.`
          : `${user.nickName}님이 교환 요청을 거절했습니다.`;
      await prisma.notification.create({
        data: {
          content: notificationContent,
          userId: exchange.requesterId,
        },
      });
      return exchange;
    } catch (error) {
      throw {
        status: httpState.serverErorr.number,
        message: "교환 상태 업데이트 실패",
      };
    }
  },

  // 교환 취소
  deleteExchange: async (exchangeId) => {
    if (!exchangeId || isNaN(parseInt(exchangeId))) {
      throw {
        status: httpState.badRequest.number,
        message: "교환 ID가 필요합니다.",
      };
    }

    try {
      const exchange = await prisma.exchange.delete({
        where: { id: parseInt(exchangeId) },
      });
      const user = await prisma.user.findUnique({
        where: { id: exchange.requesterId },
        select: { nickName: true },
      });
      if (!user) {
        throw {
          status: httpState.serverErorr.number,
          message: "유저를 찾을 수 없습니다.",
        };
      }
      const notificationContent = `${user.nickName}님이 교환 요청을 취소했습니다.`;
      await prisma.notification.create({
        data: {
          content: notificationContent,
          userId: exchange.requesterId,
        },
      });
      return exchange;
    } catch (error) {
      throw { status: httpState.serverErorr.number, message: "교환 삭제 실패" };
    }
  },
};

export default service;
