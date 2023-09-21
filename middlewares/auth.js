const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(cookie.jwt, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   console.log(authorization);

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new UnauthorizedErrorError('Необходима авторизация');
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     throw new UnauthorizedErrorError('Необходима авторизация');
//   }

//   req.user = payload;

//   next();
// };
