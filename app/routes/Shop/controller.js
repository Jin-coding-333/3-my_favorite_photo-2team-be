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
              card: {
                remainingQuantity: { gt: 0 }, // remainingQuantity > 0
              },
            }
          : status === "soldOut"
            ? {
                card: {
                  remainingQuantity: { equals: 0 }, // remainingQuantity = 0
                },
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
      include: { card: true },
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
  try {
    const ShopCard = await prisma.shop.create({
      data: req.body,
    });
    res.status(httpState.created.number).json(ShopCard);
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

    const updatedShopCard = await prisma.shop.update({
      data: req.body,
      where: { id: parseInt(shopId) },
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
    const shopCardInfo = await prisma.shop.findUnique({
      // 카드 정보
      where: { id: parseInt(shopId) },
      select: {
        card: {
          select: {
            id: true,
            user: true, // 카드 소유자 정보 포함
            price: true,
            totalQuantity: true,
            name: true,
          },
        },
      },
    });

    //원래 소유자 찾기
    const cardOwner = shopCardInfo.card.user;
    console.log({ owner: cardOwner });

    // 카드 소유자가 있니
    if (!cardOwner) {
      return res
        .status(httpState.notFound.number)
        .json("카드 소유자를 찾을 수 없습니다");
    }

    // 구매자 찾기
    const buyer = await prisma.user.findUnique({
      where: { id: buyerId },
    });
    console.log({ buyer: buyer });

    // 구매자가 있니
    if (!buyer) {
      return res
        .status(httpState.notFound.number)
        .json("구매자를 찾을 수 없습니다");
    }

    // shop에 있는 card
    const card = shopCardInfo.card;
    console.log({ card: card });

    // 카드 모자라
    if (card.totalQuantity < quantity) {
      return res.status(httpState.accepted.number).json("카드가 모자랍니다");
    }

    //카드 가격
    const totalPrice = card.price * quantity;

    // point 없으면 돌아가
    if (buyer.point < totalPrice) {
      return res.status(httpState.success.number).json("포인트가 부족합니다");
    }
    // 살 수 있어? 그럼 진행
    // 구매내역 등록
    const purchasedCard = await prisma.purchase.create({
      data: {
        userId: cardOwner.id,
        buyerId: buyer.id,
        cardId: card.id,
      },
    });
    console.log({ purchaseRecode: purchasedCard });

    //주인 바꿔
    await prisma.user.update;

    await prisma.card.create({
      where: { id: card.id },
      data: {
        userId: buyerId,
      },
    });

    res.status(httpState.created.number).json(purchasedCard);
  } catch (err) {
    res
      .status(httpState.badRequest.number)
      .json({ error: "예상치 못한 오류 발생" });
    console.error("Error occurred:", err);
  }
});

export default app;
