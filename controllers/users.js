const User = require('../models/user');

const sendStatus400 = function (res, err) {
  res.status(400).send({ message: `Переданы некорректные данные: ${err.message}` });
};

const sendStatus404 = function (res) {
  res.status(404).send({ message: 'Данные не найдены' });
};

const sendStatus500 = function (res) {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendStatus400(res, err);
      } else {
        sendStatus500(res);
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => sendStatus500(res));
};

module.exports.getUserById = (req, res) => {
  if (req.params.userId.length === 24) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          sendStatus404(res);
          return;
        }
        res.send(user);
      })
      .catch(() => sendStatus404(res));
  } else {
    const err = { message: 'Неверный формат Id' };
    sendStatus400(res, err);
  }
};

module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          sendStatus400(res, err);
        }
      });
  } else {
    sendStatus500(res);
  }
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: true })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          sendStatus400(res, err);
        }
      });
  } else {
    sendStatus500(res);
  }
};
