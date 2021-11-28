import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosConfig';

export const setFavs = createAction('GET_FAVS');

export const deleteFav = createAsyncThunk('DELETE_FAV', (item) => {
    return axiosInstance.put(`/api/user/${item.user_id}/favs`, item).then((res) => {
        if (res.status === 200) {
            return res.data.favorites;
        }
    });
});

export const favsReducer = createReducer([], {
    [setFavs]: (state, action) => action.payload,
    [deleteFav.fulfilled]: (state, action) => action.payload,
});
