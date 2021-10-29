const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const movieRouter = require('./movies');
const checkAuth = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/user', checkAuth, userRouter);
router.use('/media', checkAuth, movieRouter);

module.exports = router;
