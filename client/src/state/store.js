// import logger from 'redux-logger';
import { userReducer } from './user.js';
import { allUsersReducer } from './allUsers.js';
import { configureStore } from '@reduxjs/toolkit';
import { favsReducer } from './favs.js';
import { searchReducer } from './search';

export const store = configureStore({
    //middleware: (mw) => mw().concat(logger),
    reducer: { user: userReducer, allUsers: allUsersReducer, favs: favsReducer, search: searchReducer },
});
