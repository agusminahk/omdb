const UserService = require('../services/users');
const joi = require('../utils/joi');

class UsersController {
    // User
    static async getUser(req, res) {
        const user = await UserService.getUser(req.params.id);

        if (user) return res.json({ user });

        return res.status(404).send('User not found');
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
        if (disabled) return res.sendStatus(204);
        return res.sendStatus(400);
    }

    // History
    static async getHistory(req, res) {
        res.send();
    }

    static async setHistory(req, res) {
        res.send();
    }

    static async editHistory(req, res) {
        res.send();
    }
    static async deleteHistory(req, res) {
        res.send();
    }

    // Favorite
    static async getFavorites(req, res) {
        res.send();
    }

    static async setFavorites(req, res) {
        res.send();
    }

    static async editFavorites(req, res) {
        res.send();
    }

    static async deleteFavorites(req, res) {
        res.send();
    }
}

module.exports = UsersController;
