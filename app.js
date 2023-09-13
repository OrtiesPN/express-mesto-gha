const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { sendPageNotFound } = require('./utils/errors');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64ff13424314b0eff6797b00',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => sendPageNotFound(res));

app.listen(PORT, () => {

});
