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

module.exports.getCards = (req, res) => {};

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

module.exports.deleteCard = (req, res) => {};

module.exports.likeCard = (req, res) => {};

module.exports.unlikeCard = (req, res) => {};
