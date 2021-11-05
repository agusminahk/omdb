import { Box, IconButton, useBreakpointValue, Stack, Button, Text, Container, chakra } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import { settings } from '../helpers/settingsCarousel';
import MediaCard from './MediaCard';

const SliderSerieSearch = () => {
    const [slider, setSlider] = React.useState(<Slider />);
    const [, series] = useSelector(({ search }) => search);

    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });
    return (
        <>
            <Box
                position={'relative'}
                height={'430px'}
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
                {series && series.length ? (
                    <Box w="75%" mx="auto" justify={'center'} mb="30px">
                        <Button w="full" letterSpacing={7} colorScheme="red" rounded="xl" variant="outline">
                            SERIES
                        </Button>
                    </Box>
                ) : null}
                <Slider {...settings} ref={(slider) => setSlider(slider)}>
                    {series.map((favorite, index) => (
                        <>
                            {console.log(favorite)}
                            <MediaCard key={index} item={favorite} />
                        </>
                    ))}
                </Slider>
            </Box>
        </>
    );
};

export default SliderSerieSearch;
