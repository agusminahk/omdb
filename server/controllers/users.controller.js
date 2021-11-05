const axios = require('axios');

const UserService = require('../services/users');
const FavService = require('../services/favorites');
const joi = require('../utils/joi');

class UsersController {
    // User
    static async getUser(req, res) {
        const user = await UserService.getUser(req.params.id);

        if (user) return res.send(user);

        return res.status(404).send('User not found');
    }

    static async getUserLike(req, res) {
        const user = await UserService.getUserLike(req.body.userLike, req.body.user_id);

        if (user) return res.send(user);

        return res.status(404).send('User not found');
    }

    static async getAllUsers(req, res) {
        const users = await UserService.getAllUsers();

        if (users) return res.json({ users });

        return res.status(404).send('Users not found');
    }

    static async editUser(req, res, next) {
        const { username, password } = req.body;
        const { error } = joi.validate({ username, password });

        if (!error) {
            const editted = await UserService.editUser(req.params.id, req.body);
            return res.send(editted);
        }

        return next(error);
    }

    static async deleteUser(req, res, next) {
        const disabled = await UserService.changeStatus(req.params.id);

        if (disabled) return res.status(204).send('User disabled');

        next();
    }

    // Favorite
    static async getFavorites(req, res, next) {
        const favs = await UserService.getUser(req.params.id, 'get_favs', false);

        if (favs) return res.status(200).json({ favs });

        next();
    }

    static async setFavorites(req, res, next) {
        // Check favs duplicate
        const favs = await UserService.getUser(req.body.user_id, 'get_favs', false);
        const verify = favs.map(({ favorites }) => favorites.map((e) => (e.imdbID === req.body.media_id ? true : false)));
        if (verify[0].includes(true)) return res.status(400).send('Bad request');

        // Search a new fav
        const { data } = await axios.get(`${process.env.API_URL}&i=${req.body.media_id}`);
        if (data.Response === 'False') return res.status(404).send('ID media not found. Bad request');

        // Set this fav
        const fav = await FavService.setFavs(req.body.user_id, data);
        if (fav) return res.status(200).send(fav);

        next();
    }

    static async deleteFavorites(req, res, next) {
        const newFavorites = await FavService.deleteFav(req.params.id, req.body.media_id);

        if (newFavorites) return res.send(newFavorites);

        next();
    }

    // History
    static async getHistory(req, res) {}

    static async setHistory(req, res) {
        res.send();
    }

    static async editHistory(req, res) {
        res.send();
    }
    static async deleteHistory(req, res) {
        res.send();
    }
}

module.exports = UsersController;
