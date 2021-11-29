import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { sendLoginRequest } from '../state/user';
import { successToast } from '../helpers/toastMessages';
import { axiosInstance } from '../config/axiosConfig';

const useRegister = () => {
    const toast = useToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSubmit({ email, password, username }) {
        axiosInstance.post('/api/auth/signup', { email, password, username }).then((res) => {
            if (res.status === 200) {
                dispatch(sendLoginRequest({ email, password })).then((res) => {
                    successToast(toast, 'Account created', `Yor account has been created. Enjoy!`);
                    history.push('/');
                });
            }
        });
    }

    return { username, setUsername, email, setEmail, password, setPassword, onSubmit };
};

export default useRegister;
