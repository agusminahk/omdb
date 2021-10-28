const UsersService = require('../services/users');
const joi = require('../utils/joi');

class AuthController {
    static async singUp(req, res, next) {
        const { name, password, age, email } = req.body;
        const { error } = joi.validate({ name, password, age, email });
        console.log(error);
        if (!error) {
            const user = await UsersService.createUser(req.body);
            return user ? res.json({ user }) : res.status(404).send('Bad Request');
        }
        res.status(404).json({ error });
    }

    static signIn(req, res) {
        //res.json({ id: req.user._id, email: req.user.email, name: req.user.name });
        res.send(req.user);
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
