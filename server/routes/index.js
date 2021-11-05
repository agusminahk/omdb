const router = require('express').Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const mediaRouter = require('./media');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/media', mediaRouter);

module.exports = router;
