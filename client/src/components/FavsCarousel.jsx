import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';

import FavsEmpty from './FavsCarouselEmpty';
import { settings } from '../helpers/settingsCarousel';
import MediaCard from '../common/MediaCard';
import '../common/MediaCard.css';

function FavsCarousel() {
    const favs = useSelector(({ favs }) => favs);
    const [slider, setSlider] = React.useState(<Slider />);

    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });

    if (!favs.length) return <FavsEmpty />;

    return (
        <>
            <Box
                position={'relative'}
                height={'360px'}
                width={'full'}
                overflow={'hidden'}
                mt="27px"
                paddingTop={20}
                py={'-20px'}
                mb="50px"
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
                    color="gray.800"
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
                    color="gray.800"
                    onClick={() => slider?.slickNext()}
                >
                    <BiRightArrowAlt size="40px" />
                </IconButton>
                {/* Slider */}
                <Slider {...settings} ref={(slider) => setSlider(slider)}>
                    {favs.map((favorite, i) => (
                        <div key={`FavCar=${i}`}>
                            <MediaCard key={i} item={favorite} />
                        </div>
                    ))}
                </Slider>
            </Box>
        </>
    );
}

export default FavsCarousel;
