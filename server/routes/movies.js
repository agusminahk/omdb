const router = require('express').Router();
const MediaController = require('../controllers/media.controller');

router.get('/movie', MediaController.getAllMovies);

module.exports = router;
