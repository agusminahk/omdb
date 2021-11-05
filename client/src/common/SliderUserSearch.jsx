import { Box, IconButton, useBreakpointValue, Stack, Button, Text, Container, chakra } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import { settings } from '../helpers/settingsCarousel';
import UserCard from './UserCard';

const SliderSerieSearch = () => {
    const [slider, setSlider] = React.useState(<Slider />);
    const [, , users] = useSelector(({ search }) => search);

    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });
    return (
        <div>
            <Box position={'relative'} height={'400px'} width={'full'} overflow={'hidden'} mt="27px" mb="33px">
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
                {users && users.length ? (
                    <Box w="75%" mx="auto" justify={'center'} pt={7}>
                        <Button w="full" letterSpacing={7} colorScheme="red" rounded="xl" variant="outline">
                            USERS
                        </Button>
                    </Box>
                ) : (
                    <Box w="75%" mx="auto" justify={'center'} pt={7}>
                        <Button w="full" letterSpacing={7} colorScheme="teal" rounded="xl" variant="outline">
                            USERS NOT FOUND
                        </Button>
                    </Box>
                )}

                <Box position={'relative'} height={'400px'} width={'full'} overflow={'hidden'} mt="27px" mb="33px">
                    <Slider {...settings} ref={(slider) => setSlider(slider)}>
                        {users && users.length
                            ? users.map((user, i) => (
                                  <>
                                      <UserCard key={user._id} user={user} id={`user-${i}`} />
                                  </>
                              ))
                            : null}
                    </Slider>
                </Box>
            </Box>
        </div>
    );
};

export default SliderSerieSearch;
