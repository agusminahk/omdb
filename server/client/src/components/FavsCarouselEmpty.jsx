import React from 'react';
import { Box, IconButton, useBreakpointValue, Stack, Container } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

import favsBanner from '../assets/favsBanner.jpg';

export default function CaptionCarousel() {
    const [slider, setSlider] = React.useState(<Slider />);
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });

    const settings = {
        dots: true,
        arrows: false,
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Box
                position={'relative'}
                height={'400px'}
                width={'full'}
                overflow={'hidden'}
                mt="27px"
                mb="33px"
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
                    onClick={() => slider?.slickPrev()}
                >
                    <BiRightArrowAlt size="40px" />
                </IconButton>

                <Slider {...settings} ref={(slider) => setSlider(slider)}>
                    <>
                        <Box
                            _hover={{
                                transform: 'scale(1.12) ',
                            }}
                            _focus={{ boxShadow: 'outline' }}
                            transition="0.4s ease-in-out"
                            height={'6xl'}
                            position="relative"
                            w="full"
                            top="50%"
                            left="0%"
                            backgroundRepeat="repeat"
                            backgroundSize="fill"
                            backgroundImage={`url(${favsBanner})`}
                        >
                            <Container size="container.lg" height="400px" position="relative">
                                <Stack
                                    spacing={6}
                                    w={'full'}
                                    maxW={'lg'}
                                    position="absolute"
                                    top="85%"
                                    transform="translate(0, -50%)"
                                    align="center"
                                ></Stack>
                            </Container>
                        </Box>
                    </>
                </Slider>
            </Box>
        </>
    );
}
