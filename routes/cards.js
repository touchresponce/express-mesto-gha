const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards); // получить все
router.post("/cards", createCard); // создать карту
router.delete("/cards/:cardId", deleteCard); // удалить карту
router.put("/cards/:cardId/likes", likeCard); // лайк
router.delete("/cards/:cardId/likes", dislikeCard); // дизлайк

module.exports = router;
