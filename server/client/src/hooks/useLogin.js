import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { sendLoginRequest } from '../state/user';
import { axiosInstance } from '../config/axiosConfig.js';
import { logoutUser } from '../state/user';
import { successToast, errorToast } from '../helpers/toastMessages';

const useLogin = () => {
    const toast = useToast();
    const history = useHistory();
    const dispatch = useDispatch();

    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(sendLoginRequest({ email, password }))
                .then((res) => {
                    if (res.payload) {
                        successToast(toast, `Welcome ${res.payload.username}`);
                        history.push('/');
                    } else {
                        errorToast(toast, `Wrong email or password`);
                    }
                })

                .catch((err) => ({ err: err.message }));
        } catch (error) {
            console.error({ error: error.message });
        }
    };

    const handleLogout = (dispatch, history) => {
        axiosInstance
            .get('/api/auth/logout')
            .then(({ data }) => {
                dispatch(logoutUser(data));
                history.push('/');
            })
            .catch((err) => ({ err: err.message }));
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        handleSubmit,
        handleLogout,
    };
};

export default useLogin;
