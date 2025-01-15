import express from "express";

const app = express();

//카드 목록 조회
app.get("/api/shop/cards", async (req, res) => {
  try {
    res.json(list);
  } catch (error) {
    res
      .status(500)
      .json({ error: "카드 목록을 가져오는 중 오류가 발생했습니다." });
  }
});

//카드 상세 조회
app.get("/api/shop/cards/{shopId}", async (req, res) => {
  try {
    const { id } = req.params;
    const card = list.find((item) => item.id === parseInt(id));

    if (!card) {
      return res.status(404).json({ error: "해당 카드를 찾을 수 없습니다." });
    }

    res.json(card);
  } catch (error) {
    res
      .status(500)
      .json({ error: "카드 상세 정보를 가져오는 중 오류가 발생했습니다." });
  }
});
