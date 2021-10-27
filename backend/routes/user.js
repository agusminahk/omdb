const router = require('express').Router();

const UsersController = require('../controllers/users.controller');

// Get
router.get('/:id', UsersController.getUser);
router.get('/history', UsersController.getHistory);
router.get('/favorite', UsersController.getFavorites);

// Post
router.post('/favorite', UsersController.setFavorites);
router.post('/history', UsersController.setHistory);

// Put
router.put('/:id', UsersController.editUser);
router.put('/favorite', UsersController.editFavorites);
router.put('/history', UsersController.editHistory);

// Delete
router.delete('/:id', UsersController.deleteUser); // only change status to false;
router.delete('/favorite', UsersController.deleteFavorites);
router.delete('/history', UsersController.deleteHistory);

module.exports = router;
