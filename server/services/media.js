const axios = require('axios');
const { tags, randomize } = require('../utils/tags');

class MediaService {
    static async getMedia(type = null) {
        // Spread Media
        try {
            const [tag1, tag2, tag3, tag4, tag5, ...rest] = randomize(tags); //shuffled tags

            const [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10] = await Promise.all([
                axios.get(`${process.env.API_URL}&s=${tag1}&page=1`),
                axios.get(`${process.env.API_URL}&s=${tag1}&page=2`),
                axios.get(`${process.env.API_URL}&s=${tag2}&page=1`),
                axios.get(`${process.env.API_URL}&s=${tag2}&page=2`),
                axios.get(`${process.env.API_URL}&s=${tag3}&page=1`),
                axios.get(`${process.env.API_URL}&s=${tag3}&page=2`),
                axios.get(`${process.env.API_URL}&s=${tag4}&page=1`),
                axios.get(`${process.env.API_URL}&s=${tag4}&page=2`),
                axios.get(`${process.env.API_URL}&s=${tag5}&page=1`),
                axios.get(`${process.env.API_URL}&s=${tag5}&page=2`),
            ]);
            return [
                ...r1.data.Search,
                ...r2.data.Search,
                ...r3.data.Search,
                ...r4.data.Search,
                ...r5.data.Search,
                ...r6.data.Search,
                ...r7.data.Search,
                ...r8.data.Search,
                ...r9.data.Search,
                ...r10.data.Search,
            ];
        } catch (error) {
            console.log({ error });
        }
    }
    static async getMediaByID(media_id) {
        try {
            const media = await axios.get(`${process.env.API_URL}&i=${media_id}`);
            if (media.status === 200) return media;
        } catch (error) {
            console.log({ error });
        }
        return;
    }

    static async getMediaBySearch(media_content) {
        try {
            const [movies, series] = await Promise.all([
                axios.get(`${process.env.API_URL}&s=${media_content}&type=movie`),
                axios.get(`${process.env.API_URL}&s=${media_content}&type=series`),
            ]);
            return [movies.data.Search, series.data.Search];
        } catch (error) {
            console.log({ error });
        }
        return;
    }
}

module.exports = MediaService;
