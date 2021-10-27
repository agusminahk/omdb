const User = require('../models/User');

class UserServices {
    static async createUser(body) {
        const { email } = body;
        try {
            const user = await User.findOne({ email });
            if (user) return null;
            return await new User(body).save();
        } catch (e) {
            console.error(e);
        }
    }

    static async getUser(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = UserServices;
