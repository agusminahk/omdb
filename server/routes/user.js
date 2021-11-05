const router = require('express').Router();

const AuthController = require('../controllers/auth.controller');
const UsersController = require('../controllers/users.controller');
const authorization = require('../middlewares/auth');

// Get
router.get('/', UsersController.getAllUsers);
router.get('/me', authorization, AuthController.signIn);

router.get('/:id', UsersController.getUser);
router.get('/:id/history', authorization, UsersController.getHistory);
router.get('/:id/favs', UsersController.getFavorites);

// Post
router.post('/', UsersController.getUserLike);
router.post('/favs', authorization, UsersController.setFavorites);
router.post('/:id/history', authorization, UsersController.setHistory);

// Put
router.put('/:id', authorization, UsersController.editUser);
router.put('/:id/history', authorization, UsersController.editHistory);
router.put('/:id/favs', authorization, UsersController.deleteFavorites);

// Delete
router.delete('/:id', authorization, UsersController.deleteUser); // only change status to false;
router.delete('/:id/history', authorization, UsersController.deleteHistory);

module.exports = router;
