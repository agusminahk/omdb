import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';

export const setSearch = createAction('SET_SEARCH');

// favs

export const searchReducer = createReducer('', {
    [setSearch]: (state, action) => action.payload,
});
