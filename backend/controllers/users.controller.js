const UsersService = require('../services/users');

class UsersController {
    // User
    static async getUser(req, res) {
        const user = await UsersService.getUser(req.params.id);
        if (user) res.json({ user });
        res.status(404).send('User not found');
    }

    static async editUser(req, res) {
        res.send();
    }

    static async deleteUser(req, res) {
        res.send();
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
