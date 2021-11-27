import React, { useState } from 'react';
import { Wrap, WrapItem, Flex, chakra, Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import MediaCard from '../common/MediaCard';
import FavsCarousel from '../components/FavsCarousel';

const INITIAL_VALUE = 0;

const Home = ({ content }) => {
    const [currentPage, setCurrentPage] = useState(INITIAL_VALUE);
    const user = useSelector((state) => state.user);

    const nextPage = () => (currentPage < content.length - 24 ? setCurrentPage(currentPage + 24) : null);
    const prevPage = () => (currentPage > 23 ? setCurrentPage(currentPage - 24) : null);
    const media = content.slice(currentPage, currentPage + 24);

    return (
        <div>
            <Flex direction="column">
                {user.username ? (
                    <Box>
                        <chakra.h2
                            mx="auto"
                            my="10px"
                            align={'center'}
                            fontSize={{ base: '2xl', md: '3xl' }}
                            color={'white'}
                            fontWeight="bold"
                        >
                            your <chakra.span color={'teal.300'}>FAVORITE</chakra.span>
                            's
                        </chakra.h2>
                        <FavsCarousel />
                    </Box>
                ) : null}

                {user.username ? null : null}

                <Flex direction="row-reverse">
                    <Wrap spacing="70px" justify="center" mr="10px">
                        {media.map((item, i) => {
                            return (
                                <WrapItem key={i}>
                                    <MediaCard key={item.imdbID} item={item} id={item.imdbID} />
                                </WrapItem>
                            );
                        })}
                    </Wrap>
                </Flex>
                <Flex direction="row" mx="auto" my="50px">
                    <Button variant="outline" colorScheme="teal" mx="20px" onClick={prevPage}>
                        PREV
                    </Button>
                    <Button variant="outline" colorScheme="teal" mx="20px" onClick={nextPage}>
                        NEXT
                    </Button>
                </Flex>
            </Flex>
        </div>
    );
};

export default Home;
