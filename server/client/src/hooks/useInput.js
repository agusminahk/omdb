import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { axiosInstance } from '../config/axiosConfig';
import { getUsers } from '../state/allUsers';
import { setSearch } from '../state/search';

const useInput = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const user = useSelector((state) => state.user);

    async function _handleKeyDown(e) {
        if (e.key === 'Enter') {
            try {
                let search = [];
                const res = await axiosInstance.get(`/api/media/content/${input}`);
                const [movies, series] = res.data;
                search = [movies, series];

                const { data: userData } = await axiosInstance.post('/api/user', { userLike: input });
                search = [...search, userData];
                dispatch(setSearch(search));

                history.push('/search');
            } catch (err) {
                console.error({ error: err.message });
            }
        }
    }

    useEffect(() => {
        setUsers();
        function setUsers() {
            return axiosInstance
                .post('/api/user', { userLike: input, user_id: user._id })
                .then((res) => dispatch(getUsers(res.data)))
                .catch((err) => ({ err: err.mesage }));
        }
    }, [input]);

    return { input, setInput, _handleKeyDown };
};

export default useInput;
