const Card = require('../models/card');

const {
  sendStatus400, sendStatus404, sendStatus500,
} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => sendStatus500(res));
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(201).send(data))
        .catch(() => sendStatus500(res));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendStatus400(res, err);
      } else sendStatus500(res);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        sendStatus404(res);
        return;
      }
      res.send({ message: 'Данные удалены' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const castError = { message: 'Неверный формат Id' };
        sendStatus400(res, castError);
      } else sendStatus500(res);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        sendStatus404(res);
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const castError = { message: 'Неверный формат Id' };
        sendStatus400(res, castError);
      } else sendStatus500(res);
    });
};

module.exports.unLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        sendStatus404(res);
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const castError = { message: 'Неверный формат Id' };
        sendStatus400(res, castError);
      } else sendStatus500(res);
    });
};
