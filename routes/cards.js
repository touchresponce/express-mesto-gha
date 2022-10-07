const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
// celebrate
const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validations');

router.get('/', getCards); // получить все
router.post('/', validationCreateCard, createCard); // создать карту
router.delete('/:cardId', validationCardId, deleteCard); // удалить карту
router.put('/:cardId/likes', validationCardId, likeCard); // лайк
router.delete('/:cardId/likes', validationCardId, dislikeCard); // дизлайк

module.exports = router;
