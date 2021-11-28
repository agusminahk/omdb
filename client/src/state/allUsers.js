import { createAction, createReducer } from '@reduxjs/toolkit';

export const getUsers = createAction('GET_ALL_USERS');

export const allUsersReducer = createReducer([], {
    [getUsers]: (state, action) => (state = action.payload),
});
