const router = require('express').Router();
const passport = require('passport');

const AuthController = require('../controllers/auth.controller');
const checkAuth = require('../middlewares/auth');

router.get('/logout', checkAuth, AuthController.logOut);

router.post('/signup', AuthController.singUp);

router.post('/signin', passport.authenticate('local'), AuthController.signIn);

module.exports = router;
