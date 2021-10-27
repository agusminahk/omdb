const User = require('../models/User');

class UserServices {
    // GET
    static async createUser(body) {
        try {
            return await new User(body).save();
        } catch (error) {
            console.error(error);
        }
    }

    static async getUser(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.error(error);
        }
    }

    // static async showHistory() {

    // }
}

module.exports = UserServices;
