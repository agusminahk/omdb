const router = require('express').Router();

const UsersController = require('../controllers/users.controller');

// Get
router.get('/', UsersController.getAllUsers);
router.get('/:id', UsersController.getUser);
router.get('/:id/history', UsersController.getHistory);
router.get('/:id/favs', UsersController.getFavorites);

// Post
router.post('/:id/favs', UsersController.setFavorites);
router.post('/:id/history', UsersController.setHistory);

// Put
router.put('/:id', UsersController.editUser);
router.put('/:id/history', UsersController.editHistory);

// Delete
router.delete('/:id', UsersController.deleteUser); // only change status to false;
router.delete('/:id/favs', UsersController.deleteFavorites);
router.delete('/:id/history', UsersController.deleteHistory);

module.exports = router;
