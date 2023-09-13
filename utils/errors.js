module.exports.sendStatus400 = (res, err = '') => {
  res.status(400).send({ message: `Переданы некорректные данные: ${err.message}` });
};

module.exports.sendStatus404 = (res) => {
  res.status(404).send({ message: 'Данные не найдены' });
};

module.exports.sendPageNotFound = (res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};

module.exports.sendStatus500 = (res) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
};
