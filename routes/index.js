const router = require('express').Router();
const routeUsers = require('./users');
const routeCards = require('./cards');

router.use('/users', routeUsers);
router.use('/cards', routeCards);

module.exports = router;
