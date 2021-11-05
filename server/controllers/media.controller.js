const MediaService = require('../services/media');

class MediaController {
    static async getHome(req, res, next) {
        try {
            const movies = await MediaService.getMedia();
            if (movies.length) res.send(movies);
        } catch (err) {
            next(err);
        }
    }

    static async getMovies(req, res, next) {
        try {
            const movies = await MediaService.getMedia('movie');
            if (movies.length) res.send(movies);
        } catch (err) {
            next(err);
        }
    }

    static async getSeries(req, res, next) {
        try {
            const movies = await MediaService.getMedia('series');

            if (movies.length) res.send(movies);
        } catch (err) {
            next(err);
        }
    }

    static async getUniqueContent(req, res, next) {
        try {
            const { data } = await MediaService.getMediaByID(req.params.id);
            if (data) res.send(data);
        } catch (err) {
            next(err);
        }
    }

    static async getAllContent(req, res, next) {
        try {
            const data = await MediaService.getMediaBySearch(req.params.search);
            if (data.length) res.send(data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = MediaController;
