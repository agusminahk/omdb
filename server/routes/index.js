const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const checkAuth = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/user', checkAuth, userRouter);

module.exports = router;
