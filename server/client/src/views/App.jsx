import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router';
import { getUser } from '../state/user.js';
import { getUsers } from '../state/allUsers';
import { setFavs } from '../state/favs.js';
import { useDispatch } from 'react-redux';

import { axiosInstance } from '../config/axiosConfig';
import Navbar from './Navbar';
import Home from './Home';
import Page404 from './Page404';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import { MediaContent } from '../components/MediaContent';
import Users from '../components/UsersFinder.jsx';
import UserProfile from '../components/UserGeneralProfile.jsx';
import AdminProfile from '../components/UserLogedProfile.jsx';
import UserSettings from '../components/UserEditSettings';
import Search from './Search.jsx';
import GridMedia from '../components/GridMedia.jsx';
import './Spinner.css';

const App = () => {
    const dispatch = useDispatch();
    const [media, setMedia] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchMedia();
        async function fetchMedia() {
            try {
                const content = await axiosInstance.get('/api/media/home');
                if (content.status === 200) setMedia(content.data);

                const user = await axiosInstance.get('/api/user/me');
                if (user.data[0].email) dispatch(getUser(user.data[0]));
                if (user.data[0].email) dispatch(setFavs(user.data[0].favorites));

                const allUsers = await axiosInstance.get('/api/user');
                dispatch(getUsers(allUsers.data.users));
            } catch (err) {
                console.error({ err: err.message });
            }
        }
    }, []);

    useEffect(() => {
        fetchMedia();
        async function fetchMedia() {
            try {
                const user = await axiosInstance.get('/api/user/me');
                if (user.data[0].email) dispatch(getUser(user.data[0]));
                if (user.data[0].email) dispatch(setFavs(user.data[0].favorites));
            } catch (err) {
                console.error({ err: err.message });
            }
        }
    }, [location.key]);

    if (!media.length)
        return (
            <>
                <Navbar />
                <div className="spinner">
                    <div className="cube1"></div>
                    <div className="cube2"></div>
                </div>
            </>
        );

    return (
        <>
            <Navbar />

            <Switch>
                <Route exact path="/" render={() => <Home content={media} />} />

                <Route path="/search" render={() => <Search />} />
                <Route path="/signup" render={() => <SignUpForm />} />
                <Route path="/signin" render={() => <SignInForm />} />

                <Route path="/media/movie" render={() => <GridMedia content={media} type="movie" />} />
                <Route path="/media/serie" render={() => <GridMedia content={media} type="series" />} />
                <Route
                    exact
                    path="/media/:id"
                    render={({ match }) => <MediaContent id={match.params.id} />}
                />

                <Route exact path="/users" render={() => <Users />} />
                <Route path="/users/profile/settings" render={() => <UserSettings />} />
                <Route path="/users/profile" render={() => <AdminProfile />} />
                <Route exact path="/users/:id" render={({ match }) => <UserProfile id={match.params.id} />} />

                <Route path="/404">
                    <Page404 />
                </Route>
                <Route path="*">
                    <Redirect to="/404"> </Redirect>
                </Route>
            </Switch>
        </>
    );
};

export default App;
