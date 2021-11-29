import React from 'react';
import { Text, Box, Flex, Image, Badge, chakra, Spacer, useToast } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import poster from '../assets/poster.jpg';
import LikeButton from './LikeButton';
import LikeButtonActive from './LikeButtonActive';
import './MediaCard.css';

import { deleteFav } from '../state/favs.js';
import { toastDelete, toastAdd } from '../helpers/toastMessages';
import useMedia from '../hooks/useMedia';

const MediaCard = ({ item }) => {
    const history = useHistory();
    const toast = useToast();
    const dispatch = useDispatch();

    const favs = useSelector((state) => state.favs);
    const user = useSelector((state) => state.user);
    const { verify, setFavorite } = useMedia();

    const year = item?.Year ? item.Year.substring(0, 4) : 'N/A';
    const check = verify(favs, item);

    return (
        <div>
            {item ? (
                <Box className="card">
                    {item.Poster !== 'N/A' ? (
                        <Image
                            onClick={() => history.push(`/media/${item.imdbID}`)}
                            cursor="poiter"
                            src={item.Poster}
                            objectFit="contains"
                            h="100%"
                            w="100%"
                        />
                    ) : (
                        <Image src={poster} objectFit="contains" h="100%" w="100%" />
                    )}

                    <Flex
                        className="info"
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        w="full"
                    >
                        <Flex direction="wrap" w="full" pt="3">
                            <Badge rounded="full" px="3" mt="-1" colorScheme="teal">
                                Full HD
                            </Badge>
                            <Spacer />
                            <Badge rounded="full" px="6" mt="-1" colorScheme="teal" ml="-10px">
                                {year}
                            </Badge>
                        </Flex>

                        <Box w="200px" shadow="xs" rounded="lg" overflow="hidden">
                            <chakra.h3
                                py={2}
                                textAlign="center"
                                fontWeight="ligth"
                                fontSize="xl"
                                color={'white'}
                                letterSpacing={1}
                                _hover={{ color: 'pink.300', shadow: '5xl' }}
                            >
                                <Link to={`/media/${item.imdbID}`}> {item.Title}</Link>
                            </chakra.h3>
                            <Text>{item?.Plot?.substring(0, 140)}</Text>
                        </Box>
                        {user.username && check === false ? (
                            <Box
                                mx="auto"
                                rounded="full"
                                onClick={() => {
                                    setFavorite(dispatch, user._id, item.imdbID);
                                    toastAdd(toast, `${item.Title}`);
                                }}
                            >
                                <LikeButton />
                            </Box>
                        ) : null}
                        {user.username && check === true ? (
                            <Box
                                mx="auto"
                                onClick={() => {
                                    dispatch(deleteFav({ user_id: user._id, media_id: item.imdbID }));
                                    toastDelete(toast, `${item.Title}`);
                                }}
                            >
                                <LikeButtonActive />
                            </Box>
                        ) : null}
                    </Flex>
                </Box>
            ) : null}
        </div>
    );
};

export default MediaCard;
