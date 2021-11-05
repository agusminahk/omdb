const router = require('express').Router();

const MediaController = require('../controllers/media.controller');

router.get('/home', MediaController.getHome);

router.get('/:id', MediaController.getUniqueContent);
router.get('/movie', MediaController.getMovies);
router.get('/serie', MediaController.getSeries);

router.get('/content/:search', MediaController.getAllContent);

module.exports = router;
