const router = require('express').Router();

const UsersController = require('../controllers/users.controller');
const checkAuth = require('../middlewares/auth');

router.get('/profile');
router.get('/history');
router.get('/:id', checkAuth, UsersController.getUser);

module.exports = router;
