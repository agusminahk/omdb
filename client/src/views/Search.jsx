import { Box, IconButton, useBreakpointValue, Stack, Button, Text, Container, chakra } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import FavsEmpty from '../components/FavsCarouselEmpty';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
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
