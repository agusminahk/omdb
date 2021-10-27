const UsersService = require('../services/users');

class UsersController {
    static async createUser(req, res, next) {
        const user = await UsersService.createUser(req.body);
        if (user === null) res.status(400).send('este Email ya existe');

        //req.logIn(user, (err) => {
        //  if (err) return next(err);
        // res.status(200).send('usuario creado con exito');
        // });
        user ? res.status(200).json(user) : res.status(404).send('Bad Request');
    }

    static async getUser(req, res) {
        const id = req.params.id;
        const user = await UsersService.getUser(id);
        if (user) {
            res.send(user);
        }
        res.send('usuario no existe');
    }
}

module.exports = UsersController;
