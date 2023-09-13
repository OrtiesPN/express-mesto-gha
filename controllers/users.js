const User = require('../models/user');

const {
  sendStatus400, sendStatus404, sendStatus500,
} = require('../utils/errors');

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
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        sendStatus404(res);
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const castError = { message: 'Неверный формат Id' };
        sendStatus400(res, castError);
      } else sendStatus500(res);
    });
};

module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendStatus400(res, err);
      } else sendStatus500(res);
    });
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendStatus400(res, err);
      } else sendStatus500(res);
    });
};
