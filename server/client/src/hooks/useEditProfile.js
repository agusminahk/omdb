import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { successToast, errorToast } from '../helpers/toastMessages';
import { sendUpdateRequest } from '../state/user';

const useEditProfile = () => {
    const toast = useToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(({ user }) => user);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    function onSubmit({ confirmPass, password, username }) {
        if (confirmPass !== password) {
            errorToast(toast, 'Passwords do not match!');
            return;
        }

        return dispatch(sendUpdateRequest({ username, password: confirmPass, id: user._id })).then(() => {
            successToast(toast, 'Your user has been edited correctly!');
            history.push('/');
        });
    }

    return { username, setUsername, password, setPassword, confirmPass, setConfirmPass, onSubmit };
};

export default useEditProfile;
