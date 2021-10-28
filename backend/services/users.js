const bcrypt = require('bcrypt');

const User = require('../models/User');

class UserService {
    static async createUser({ name, email, password, age }) {
        try {
            const user = new User({ name, email, password, age });
            return await user.save();
        } catch (error) {
            console.error({ error });
        }
    }

    static async getUser(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.error({ error });
        }
    }

    static async editUser(id, { password, name }) {
        try {
            return await User.findByIdAndUpdate(
                id,
                {
                    $set: { password: password && bcrypt.hashSync(password, 12), name },
                },
                { new: true }
            );
        } catch (error) {
            console.error({ error });
        }
    }

    static async changeStatus(id) {
        try {
            return await User.findOneAndUpdate(
                { _id: id },
                {
                    $set: { status: false },
                },
                { new: true }
            );
        } catch (error) {
            console.error({ error });
        }
    }
}

module.exports = UserService;
