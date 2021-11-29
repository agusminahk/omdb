import { useEffect, useState } from 'react';

import { axiosInstance } from '../config/axiosConfig.js';
import { setFavs } from '../state/favs.js';

const useMedia = (id) => {
    const [media, setMedia] = useState({});

    const setFavorite = (dispatch, user_id, media_id) => {
        axiosInstance
            .post('/api/user/favs', { user_id: user_id, media_id })
            .then((res) => dispatch(setFavs(res.data.favorites)))
            .catch((err) => ({ error: err.message }));
    };

    const verify = (favs, item) => {
        const verify = favs.map((e) => (e.imdbID === item.imdbID ? true : false));

        if (verify.includes(true)) return true;

        return false;
    };

    useEffect(() => {
        axiosInstance
            .get(`/api/media/${id}`)
            .then((res) => setMedia(res.data))
            .catch((err) => ({ err: err.message }));

        window.scrollTo(0, 0);
    }, [id]);

    return { media, verify, setFavorite };
};

export default useMedia;
