const User = require('../models/User');

class FavService {
    static async setFavs(user_id, movie) {
        try {
            return await User.findOneAndUpdate(
                { _id: user_id },
                {
                    $push: {
                        favorites: {
                            $each: [movie],
                            $position: 0, //add favs to the beginning of the array
                        },
                    },
                },
                { new: true }
            );
        } catch (error) {
            console.error({ error });
        }
    }

    static async deleteFav(user_id, movie_id) {
        try {
            return await User.findByIdAndUpdate({ _id: user_id }, { $pull: { favorites: { imdbID: movie_id } } }, { new: true });
        } catch (error) {
            console.error({ error });
        }
    }
}

module.exports = FavService;
