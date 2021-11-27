import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Box, IconButton, useBreakpointValue, Button } from '@chakra-ui/react';

import MediaCard from './MediaCard';
import { settings } from '../helpers/settingsCarousel';

const SliderMovieSearch = () => {
    const [slider, setSlider] = React.useState(<Slider />);
    const movies = useSelector(({ search }) => search[0]);

    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });

    return (
        <>
            <Box
                position={'relative'}
                height={'460px'}
                width={'full'}
                overflow={'hidden'}
                mt="27px"
                paddingTop={-20}
                py={'-20px'}
                mb="25px"
            >
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                {/* Left Icon */}
                <IconButton
                    aria-label="left-arrow"
                    variant="ghost"
                    position="absolute"
                    left={side}
                    top={top}
                    transform={'translate(0%, -50%)'}
                    zIndex={2}
                    onClick={() => slider?.slickPrev()}
                >
                    <BiLeftArrowAlt size="40px" />
                </IconButton>
                {/* Right Icon */}
                <IconButton
                    aria-label="right-arrow"
                    variant="ghost"
                    position="absolute"
                    right={side}
                    top={top}
                    transform={'translate(0%, -50%)'}
                    zIndex={2}
                    onClick={() => slider?.slickNext()}
                >
                    <BiRightArrowAlt size="40px" />
                </IconButton>
                {/* Slider */}
                {movies && movies.length ? (
                    <Box w="75%" mx="auto" justify={'center'} mb="30px">
                        <Button w="full" letterSpacing={7} colorScheme="red" rounded="xl" variant="outline">
                            MOVIES
                        </Button>
                    </Box>
                ) : null}
                <Slider {...settings} ref={(slider) => setSlider(slider)}>
                    {movies.map((favorite, index) => (
                        <>
                            <MediaCard key={index} item={favorite} />
                        </>
                    ))}
                </Slider>
            </Box>
        </>
    );
};

export default SliderMovieSearch;
