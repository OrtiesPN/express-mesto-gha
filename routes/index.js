const router = require('express').Router();
const routeUsers = require('./users');
const routeCards = require('./cards');
const routeSignup = require('./signup');
const routeSignin = require('./signin');

const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');

router.use('*', (req, res, next) => next(new NotFoundError('Такой страницы не существует')));
router.use('/signup', routeSignup);
router.use('/signin', routeSignin);
router.use(auth);
router.use('/users', routeUsers);
router.use('/cards', routeCards);

module.exports = router;
