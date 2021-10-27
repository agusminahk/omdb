const passport = require('passport');
const UsersController = require('./users.controller');

class AuthController {
    static async singUp(req, res) {
        const user = await UsersController.createUser;
        if (user) res.status(200).json(user);
        res.status(401).send('Error on user create');
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
