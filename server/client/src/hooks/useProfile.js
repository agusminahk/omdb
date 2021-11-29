import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosConfig';

const useProfile = (id) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        getData();
        async function getData() {
            const user = await axiosInstance.get(`/api/user/${id}`);
            setCurrentUser(user.data[0]);
        }
    }, [id]);
    return { currentUser };
};

export default useProfile;
