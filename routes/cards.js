const router = require('express').Router();
const {
  getCards,
  addCard,
  deleteCard,
  likeCard,
  unLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', addCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', unLikeCard);

module.exports = router;
