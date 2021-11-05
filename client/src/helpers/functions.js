import axios from 'axios';
import { setFavs } from '../state/favs.js';

export function setFavorite(dispatch, user_id, media_id) {
    axios
        .post('/api/user/favs', { user_id: user_id, media_id })
        .then((res) => dispatch(setFavs(res.data.favorites)))
        .catch((err) => ({ error: err.message }));
}

export function verify(favs, item) {
    const verify = favs.map((e) => (e.imdbID === item.imdbID ? true : false));

    if (verify.includes(true)) return true;

    return false;
}
