import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import service from "./service.js";
import { httpState } from "../../config.js";

const router = express.Router();

// 포토카드 교환 제안 생성
router.post(
  "/cards/:shopId/exchange",
  authMiddleware.verifyAccessToken,
  async (req, res) => {
    const { shopId } = req.params;
    const { cardId, targetCard } = req.body;
    const userId = req.user.id;

    try {
      const exchange = await service.createExchange({
        shopId,
        cardId,
        targetCard,
        userId,
      });
      res
        .status(httpState.created.number)
        .json({ success: true, data: exchange });
    } catch (error) {
      res.status(error.status || httpState.serverErorr.number).json({
        success: false,
        message: error.message || "교환 제안 생성 실패",
      });
    }
  }
);

// 포토카드 교환 제안 승인과 거절
router.post(
  "/cards/:exchangeId/exchange/:action",
  authMiddleware.verifyAccessToken,
  async (req, res) => {
    const { exchangeId, action } = req.params;
    if (!["accept", "refuse"].includes(action)) {
      return res
        .status(httpState.badRequest.number)
        .json({ success: false, message: "잘못된 요청" });
    }

    try {
      const exchange = await service.updateExchange({ exchangeId, action });
      res
        .status(httpState.success.number)
        .json({ success: true, data: exchange });
    } catch (error) {
      res.status(error.status || httpState.serverErorr.number).json({
        success: false,
        message: error.message || "교환 상태 변경 실패",
      });
    }
  }
);

// 포토카드 교환 제안 취소
router.delete(
  "/cards/:exchangeId/exchange",
  authMiddleware.verifyAccessToken,
  async (req, res) => {
    const { exchangeId } = req.params;

    try {
      await service.deleteExchange(exchangeId);
      res
        .status(httpState.success.number)
        .json({ success: true, message: "교환 제안 취소 성공" });
    } catch (error) {
      res.status(error.status || httpState.serverErorr.number).json({
        success: false,
        message: error.message || "교환 제안 취소 실패",
      });
    }
  }
);

// 알림 조회
router.get(
  "/notifications",
  authMiddleware.verifyAccessToken,
  async (req, res) => {
    const userId = req.user.id;

    try {
      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      res
        .status(httpState.success.number)
        .json({ success: true, data: notifications });
    } catch (error) {
      res
        .status(httpState.serverErorr.number)
        .json({ success: false, message: "알림 조회 실패" });
    }
  }
);

// 알림 읽음 처리 (isRead 필드 업데이트)
router.patch(
  "/notifications/:notificationId",
  authMiddleware.verifyAccessToken,
  async (req, res) => {
    const { notificationId } = req.params;

    try {
      await prisma.notification.update({
        where: { id: parseInt(notificationId) },
        data: { isRead: true },
      });
      res.status(httpState.success.number).json({
        success: true,
        message: "알림이 읽음 처리되었습니다.",
      });
    } catch (error) {
      res
        .status(httpState.serverErorr.number)
        .json({ success: false, message: "알림 수정 실패" });
    }
  }
);

export default router;
