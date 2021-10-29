const axios = require('axios');
const dotenv = require('dotenv');

const UserService = require('./users.js');
const User = require('../models/User');

dotenv.config();

class FavService {
    static async setFavs(user_id, movie) {
        try {
            //const user = await UserService.getUser(user_id);
            return await User.findOneAndUpdate(
                { _id: user_id },
                {
                    $set: {
                        favorites: [movie],
                    },
                },
                { new: true }
            );
        } catch (error) {
            console.error({ error });
        }
    }
}

module.exports = FavService;
