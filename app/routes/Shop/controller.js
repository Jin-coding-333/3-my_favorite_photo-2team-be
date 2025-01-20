import express from "express";
import { httpState } from "../../../config/config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express.Router();

//카드 목록 조회
app.get("/cards", async (req, res) => {
  try {
    const {
      orderBy = "desc",
      keyword = "",
      grade = "",
      genre = "",
      status = "",
    } = req.query;

    const searchQuery = {
      AND: [
        keyword
          ? {
              OR: [
                { title: { contains: keyword, mode: "insensitive" } },
                { content: { contains: keyword, mode: "insensitive" } },
              ],
            }
          : {},
        grade ? { card: { grade } } : {},

        genre ? { card: { genre } } : {},

        status === "onSale"
          ? {
              remainingQuantity: { gt: 0 }, // remainingQuantity > 0
            }
          : status === "soldOut"
            ? {
                remainingQuantity: { equals: 0 }, // remainingQuantity = 0
              }
            : {}, // status가 없으면 필터링 없음
      ],
    };

    const sortOption =
      orderBy === "desc"
        ? { createdAt: "desc" }
        : orderBy === "asc"
          ? { createdAt: "asc" }
          : orderBy === "manyPoint"
            ? { point: "desc" }
            : { point: "asc" };

    const cardList = await prisma.shop.findMany({
      where: searchQuery,
      orderBy: sortOption,
      include: {
        card: true,
      },
    });
    res.status(httpState.success.number).json(cardList);
  } catch (error) {
    console.log({ error: error });
    res
      .status(httpState.badRequest.number)
      .json({ error: "예상치 못한 오류 발생" });
  }
});

//카드 상세 조회
app.get("/cards/:shopId", async (req, res) => {
  try {
    //shop에 등록된 id에 맞는 card 찾기
    const { shopId } = req.params;
    const card = await prisma.shop.findUnique({
      where: { id: parseInt(shopId) },
      include: { card: true, user: true },
    });
    if (!card) {
      return res.status(httpState.success.number).json("해당 카드는 없습니다");
    }

    // card 정보 넘겨주기
    res.json(card);
  } catch (error) {
    console.log({ error: error });
    res
      .status(httpState.badRequest.number)
      .json({ error: "예상치 못한 오류 발생" });
  }
});

//카드 등록하기
app.post("/cards", async (req, res) => {
  const { userId, cardId, totalQuantity, content } = req.body;
  try {
    //cardId로 먼저 uniqueId 찾아
    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
      },
      select: {
        uniqueId: true,
      },
    });
    console.log(card.uniqueId);
    if (!card) {
      return res.status(404).json({ error: "카드를 찾을 수 없습니다." });
    }

    //사용자 카드 중 uniqueId를 가지고 있는 카드 id 다 가져와
    const userCards = await prisma.card.findMany({
      where: {
        userId: userId,
        uniqueId: card.uniqueId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    console.log(userCards);
    console.log(userCards.length);
    console.log(totalQuantity);

    // 너 이거 이만큼 가지고 있니?
    // 없으면 빠꾸
    if (userCards.length < totalQuantity) {
      return res.status(httpState.badRequest.number).json("카드가 모자랍니다");
    }

    // 너 전에 등록한 적 있니?
    // shop에서 등록된 카드들의 uniqueId를 확인
    const existingShop = await prisma.shop.findFirst({
      where: {
        userId: userId,
      },
      include: {
        card: {
          select: {
            uniqueId: true, // 카드의 uniqueId 가져오기
          },
        },
      },
    });

    // 등록된 카드가 있고 그 카드의 uniqueId와 판매자가 등록하려는 카드의 uniqueId가 일치하면
    if (existingShop && existingShop.card.uniqueId === card.uniqueId) {
      return res
        .status(httpState.badRequest.number)
        .json("이미 등록된 카드입니다.");
    }

    // 없어? 그럼 새로 등록 해!
    // title은 카드 이름이겠지?

    const shopCard = await prisma.shop.create({
      data: {
        title: userCards[0].name,
        content,
        userId,
        cardId,
        totalQuantity,
        remainingQuantity: totalQuantity,
      },
    });
    res.status(httpState.created.number).json({ "등록된 데이터": shopCard });

    // res.status(httpState.created.number).json("성공");
  } catch (err) {
    res
      .status(httpState.badRequest.number)
      .json({ error: "예상치 못한 오류 발생" });
    console.error("Error occurred:", err);
  }
});

//카드 수정
app.put("/cards/:shopId", async (req, res) => {
  try {
    const { shopId } = req.params;
    const { totalQuantity, content } = req.body;

    // 기존 shopCard 정보 가져오기
    const existingShopCard = await prisma.shop.findUnique({
      where: { id: parseInt(shopId) },
    });

    if (!existingShopCard) {
      return res
        .status(httpState.badRequest.number)
        .json({ error: "카드를 찾을 수 없습니다." });
    }

    const soldQuantity =
      existingShopCard.totalQuantity - existingShopCard.remainingQuantity;

    if (soldQuantity > totalQuantity) {
      return res.status(400).json({
        error: "총 수량은 이미 팔린 수량보다 많아야 합니다.",
      });
    }
    let newRemainingQuantity;
    if (totalQuantity < existingShopCard.totalQuantity) {
      // totalQuantity가 감소하는 경우: remainingQuantity는 totalQuantity로 맞춤
      newRemainingQuantity = totalQuantity;
    } else {
      // totalQuantity가 증가하는 경우: 기존 remainingQuantity + 증가한 수량
      const quantityIncrease = totalQuantity - existingShopCard.totalQuantity;
      newRemainingQuantity =
        existingShopCard.remainingQuantity + quantityIncrease;
    }
    const updatedShopCard = await prisma.shop.update({
      where: { id: parseInt(shopId) },
      data: {
        totalQuantity, // totalQuantity 업데이트
        remainingQuantity: newRemainingQuantity, // 팔린 수량 차감 후 remainingQuantity 업데이트
        content, // content 수정
      },
    });
    res.status(httpState.success.number).json({ 수정완료: updatedShopCard });
  } catch (err) {
    res
      .status(httpState.badRequest.number)
      .json({ error: "예상치 못한 오류 발생" });
    console.error("Error occurred:", err);
  }
});

//카드 판매 취소
app.delete("/cards/:shopId", async (req, res) => {
  try {
    const { shopId } = req.params;

    await prisma.shop.delete({
      where: { id: parseInt(shopId) },
    });
    return res.status(httpState.success.number).json({
      message: "판매가 취소되었습니다.",
    });
  } catch (err) {
    res
      .status(httpState.badRequest.number)
      .json({ error: "예상치 못한 오류 발생" });
    console.error("Error occurred:", err);
  }
});

//카드 구매 (진행중)
app.post("/cards/:shopId/purchase", async (req, res) => {
  try {
    const { shopId } = req.params;
    const { buyerId, quantity } = req.body;

    //등록된 카드 찾기
    const shopInfo = await prisma.shop.findUnique({
      // 카드 정보
      where: { id: parseInt(shopId) },
      include: {
        card: {
          select: {
            uniqueId: true,
            user: true, // 카드 소유자 정보 포함
            price: true,
          },
        },
      },
    });
    console.log({ shopInfo: shopInfo });

    //  판매자  id
    const shopOwnerId = shopInfo.userId;

    // 구매자 찾기
    const buyer = await prisma.user.findUnique({
      where: { id: buyerId },
    });

    // 구매자가 없으면 빠꾸
    if (!buyer) {
      return res
        .status(httpState.notFound.number)
        .json("구매자를 찾을 수 없습니다");
    }

    console.log({ buyer: buyer });

    // shop에 있는 card
    const card = shopInfo.card;
    console.log({ card: card });

    // 카드 모자라
    if (shopInfo.remainingQuantity < quantity) {
      return res.status(httpState.accepted.number).json("카드가 모자랍니다");
    }

    //카드 가격
    const totalPrice = card.price * quantity;

    // point 없으면 돌아가
    if (buyer.point < totalPrice) {
      return res.status(httpState.success.number).json("포인트가 부족합니다");
    }

    // 판매 가능한 카드 리스트
    const cardList = await prisma.card.findMany({
      where: {
        userId: shopOwnerId,
        uniqueId: card.uniqueId,
      },
    });
    console.log({ cardList: cardList, carListLength: cardList.length });

    const selectedCards = cardList.slice(0, quantity);
    console.log(selectedCards);
    const selectedCardIds = selectedCards.map((card) => card.id);
    console.log(selectedCardIds);
    // 살 수 있어? 그럼 진행

    const purchase = await prisma.$transaction(async (prisma) => {
      // 구매 기록 생성
      const newPurchase = await prisma.purchase.create({
        data: {
          userId: shopOwnerId, // 판매자 ID
          buyerId: buyerId, // 구매자 ID
          card: {
            connect: selectedCardIds.map((cardId) => ({ id: cardId })), //객체로 전달
          },
        },
      });

      // 판매자 돈 받기
      await prisma.user.update({
        where: { id: shopOwnerId },
        data: { point: { increment: totalPrice } },
      });

      // 구매자 돈 내기
      await prisma.user.update({
        where: { id: buyerId },
        data: { point: { decrement: totalPrice } },
      });

      // 재고 감소
      await prisma.shop.update({
        where: { id: parseInt(shopId) },
        data: { remainingQuantity: { decrement: quantity } },
      });

      // 구매한 카드들의 userId를 구매자(구매자 ID)로 업데이트
      await prisma.card.updateMany({
        where: {
          id: { in: selectedCardIds },
        },
        data: {
          userId: buyerId, // 구매자 ID로 userId 변경
        },
      });

      return newPurchase;
    });

    res.status(httpState.created.number).json(purchase);
  } catch (err) {
    res
      .status(httpState.badRequest.number)
      .json({ error: "예상치 못한 오류 발생" });
    console.error("Error occurred:", err);
  }
});

export default app;
