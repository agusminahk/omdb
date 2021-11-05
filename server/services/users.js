const bcrypt = require('bcrypt');

const User = require('../models/User');

class UserService {
    static async createUser({ username, email, password }) {
        try {
            const user = new User({ username, email, password });
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
                password: 0,
            }); // Full User
        } catch (error) {
            console.error({ error });
        }
    }

    static async getUserLike(user, user_id) {
        try {
            if (user_id) {
                return await User.find({ _id: { $ne: user_id }, username: { $regex: '.*' + user + '.*' } }).select({
                    password: 0,
                });
            }
            return await User.find({ username: { $regex: '.*' + user + '.*' } }).select({
                password: 0,
            });
        } catch (error) {
            console.error({ error });
        }
    }

    static async getAllUsers() {
        try {
            return await User.find({ status: true }).select({ password: 0 });
        } catch (error) {
            console.error({ error });
        }
    }

    static async editUser(id, { password, username }) {
        try {
            return await User.findByIdAndUpdate(
                id,
                {
                    $set: { password: password && bcrypt.hashSync(password, 12), username },
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
