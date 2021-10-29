const axios = require('axios');

const UserService = require('../services/users');
const FavService = require('../services/favorites');
const joi = require('../utils/joi');

class UsersController {
    // User
    static async getUser(req, res) {
        const user = await UserService.getUser(req.params.id);

        if (user) return res.json({ user });

        return res.status(404).send('User not found');
    }

    static async getAllUsers(req, res) {
        const users = await UserService.getAllUsers();
        if (users) return res.json({ users });
        return res.status(404).send('Users not found');
    }

    static async editUser(req, res) {
        const { name, password, age, email } = req.body;
        const { error } = joi.validate({ name, password, age, email });

        if (!error) {
            const editted = await UserService.editUser(req.params.id, req.body);
            return res.json({ user_editted: editted });
        }

        return res.status(400).json({ error });
    }

    static async deleteUser(req, res) {
        const disabled = await UserService.changeStatus(req.params.id);
        if (disabled) return res.status(204).send('User disabled');
        return res.sendStatus(400);
    }

    // Favorite
    static async getFavorites(req, res) {
        const favs = await UserService.getUser(req.params.id, 'get_favs', false);
        if (favs) return res.status(200).json({ favs });
        return res.sendStatus(400);
    }

    static async setFavorites(req, res) {
        const movie = await axios.get(`${process.env.API_URL}&i=${req.body.mov_id}`);
        console.log(movie.data.Response);
        if (movie.data.Response === 'False') return res.status(404).send('ID movie not found. Bad request');
        const favs = await FavService.setFavs(req.params.id, movie.data);
        if (favs) return res.status(200).json({ favs });
        return res.sendStatus(404);
    }

    static async deleteFavorites(req, res) {
        const deleted = await FavService.deleteFav(req.params.id, req.body.mov_id);
        if (deleted) return res.status(204).json({ favs: deleted });
        return res.status(404).send('Fail on delete');
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
