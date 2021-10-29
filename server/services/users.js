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

    static async getUser(user_id, fav = null, hist = null) {
        try {
            if (fav) return await User.find({ _id: user_id, status: true }).select({ favorites: 1 }); // User Favs
            if (hist) return await User.find({ _id: user_id, status: true }).select({ history: 1 }); // User history
            return await User.find({ _id: user_id, status: true }).select({
                name: 1,
                email: 1,
                age: 1,
                favorites: 1,
                history: 1,
            }); // Full User
        } catch (error) {
            console.error({ error });
        }
    }

    static async getAllUsers() {
        try {
            return await User.find({ status: true }).select({ name: 1, email: 1, age: 1, favorites: 1, history: 1 });
        } catch (error) {
            console.error({ error });
        }
    }

    static async editUser(id, { password, name, age }) {
        try {
            return await User.findByIdAndUpdate(
                id,
                {
                    $set: { password: password && bcrypt.hashSync(password, 12), name, age },
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
