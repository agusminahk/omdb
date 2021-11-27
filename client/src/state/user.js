import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

// logins
export const getUser = createAction('GET_USER');
export const logoutUser = createAction('LOGOUT_USER');

export const usertunk = createAsyncThunk('AUTO_LOGIN', () => {
    return axios.get('/api/user/me').then(({ data }) => data[0]);
});

export const sendLoginRequest = createAsyncThunk('LOGIN', (login) => {
    return axios.post('/api/auth/signin', login).then((res) => {
        if (res.status === 200) {
            return res.data[0];
        }
    });
});
export const sendUpdateRequest = createAsyncThunk('UPDATE', ({ username, password, id }) => {
    return axios.put(`/api/user/${id}`, { username, password }).then((res) => {
        if (res.status === 200) {
            return res.data[0];
        }
    });
});

export const userReducer = createReducer(
    {},
    {
        [getUser]: (state, action) => action.payload,
        [logoutUser]: (state, action) => action.payload,
        [sendLoginRequest.fulfilled]: (state, action) => action.payload,
        [sendUpdateRequest.fulfilled]: (state, action) => (state = action.payload),
    }
);
