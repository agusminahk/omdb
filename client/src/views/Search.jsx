import React from 'react';
import { useSelector } from 'react-redux';

import SliderMovieSearch from '../common/SliderMovieSearch';
import SliderSerieSearch from '../common/SliderSerieSearch';
import SliderUserSearch from '../common/SliderUserSearch';

const Search = () => {
    const [movies, series, users] = useSelector(({ search }) => search);
    return (
        <div>
            {movies ? <SliderMovieSearch /> : null}
            {series ? <SliderSerieSearch /> : null}
            {users ? <SliderUserSearch /> : null}
        </div>
    );
};

export default Search;
