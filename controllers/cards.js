const Card = require('../models/card');

const sendStatus400 = function (res, err) {
  res.status(400).send({ message: `Переданы некорректные данные: ${err.message}` });
};

const sendStatus404 = function (res) {
  res.status(404).send({ message: 'Данные не найдены' });
};

const sendStatus500 = function (res) {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
};

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
        .catch(() => sendStatus404(res));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendStatus400(res, err);
      } else sendStatus500(res);
    });
};

module.exports.deleteCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          sendStatus404(res);
          return;
        }
        res.send({ message: 'Данные удалены' });
      })
      .catch(() => sendStatus500(res));
  } else {
    const err = { message: 'Неверный формат Id' };
    sendStatus400(res, err);
  }
};

module.exports.likeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          sendStatus404(res);
          return;
        }
        res.send(card);
      })
      .catch(() => sendStatus500(res));
  } else {
    const err = { message: 'Неверный формат Id' };
    sendStatus400(res, err);
  }
};

module.exports.unlikeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          sendStatus404(res);
          return;
        }
        res.send(card);
      })
      .catch(() => sendStatus500(res));
  } else {
    const err = { message: 'Неверный формат Id' };
    sendStatus400(res, err);
  }
};
