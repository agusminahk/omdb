const UsersService = require('../services/users');

class AuthController {
    static async singUp(req, res, next) {
        const user = await UsersService.createUser(req.body);
        user ? res.json({ user }) : res.status(404).send('Bad Request');
    }

    static signIn(req, res) {
        res.json({ id: req.user._id, email: req.user.email, name: req.user.name });
    }

    static async logOut(req, res) {
        await req.logOut();
        res.status(200).clearCookie('connect.sid', {
            path: '/',
        });
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    }
}

module.exports = AuthController;
