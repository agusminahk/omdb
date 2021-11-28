import {
    chakra,
    Box,
    useColorModeValue,
    Button,
    Wrap,
    Stack,
    Image,
    Text,
    Icon,
    SimpleGrid,
    Flex,
    Badge,
    useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { GiDirectorChair } from 'react-icons/gi';
import { MdLayers } from 'react-icons/md';
import { IoMdStarOutline } from 'react-icons/io';
import { FaVoteYea } from 'react-icons/fa';
import { MdOutlineWatchLater } from 'react-icons/md';

import StatsCard from '../common/StatsCard';
import LikeButton from '../common/LikeButton';
import LikeButtonActive from '../common/LikeButtonActive';
import { deleteFav } from '../state/favs.js';
import { verify, setFavorite } from '../helpers/functions';
import { toastDelete, toastAdd } from '../helpers/toastMessages';
import './MediaContent.css';
import { axiosInstance } from '../config/axiosConfig';

export const MediaContent = ({ id }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const user = useSelector(({ user }) => user);
    const favs = useSelector(({ favs }) => favs);

    const [media, setMedia] = useState({});
    const [play, setPlay] = useState(false);

    const genre = media?.Genre ? media.Genre.split(', ') : [];
    const year = media?.Year ? media.Year.substring(0, 4) : 'N/A';

    useEffect(() => {
        axiosInstance
            .get(`/api/media/${id}`)
            .then((res) => setMedia(res.data))
            .catch((err) => ({ err: err.message }));

        window.scrollTo(0, 0);
    }, [id]);

    const check = verify(favs, media);
    return (
        <>
            <Box px={2} py={24} mx="auto" mt={'-66px'} justifyContent="center" align="center">
                <Box
                    w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
                    mx="auto"
                    textAlign={{ base: 'center', md: 'center' }}
                >
                    <Flex id="mobile">
                        <Box w="full" h="full" direction="column">
                            <Image mx="auto" src={media.Poster} rounded={'lg'} w="200px" mb="15px"></Image>
                            {user.username && check === false ? (
                                <Box
                                    mt="-15px"
                                    onClick={() => {
                                        setFavorite(dispatch, user._id, media.imdbID);
                                        toastAdd(toast, `${media.Title}`);
                                    }}
                                >
                                    <LikeButton />
                                </Box>
                            ) : null}
                            {user.username && check === true ? (
                                <Box
                                    mt="-15px"
                                    onClick={() => {
                                        dispatch(deleteFav({ user_id: user._id, media_id: media.imdbID }));
                                        toastDelete(toast, `${media.Title}`);
                                    }}
                                >
                                    <LikeButtonActive />
                                </Box>
                            ) : null}
                        </Box>
                        <Flex direction="column">
                            <chakra.h1
                                mb={2}
                                fontSize={{ base: '2xl', md: '4xl' }}
                                fontWeight="bold"
                                lineHeight="none"
                                justifyContent="center"
                                letterSpacing={{ base: 'normal', md: 'tight' }}
                                color={useColorModeValue('gray.900', 'gray.100')}
                            >
                                <Text
                                    display={{ base: 'block', lg: 'inline' }}
                                    w="full"
                                    bgClip="text"
                                    bgGradient="linear(to-r, teal.500,pink.200)"
                                    fontWeight="semi-bold"
                                    justifyContent="center"
                                >
                                    {media.Title}
                                </Text>
                            </chakra.h1>
                            <Box align="center" mb={3}>
                                <Badge rounded="full" w="100px" px="3" colorScheme="teal" ml="4">
                                    {media?.Type?.charAt(0).toUpperCase() + media?.Type?.slice(1)}
                                </Badge>
                            </Box>
                            <chakra.p
                                px={{ base: 0, lg: 24 }}
                                mb={6}
                                fontSize={{ base: 'lg', md: 'xl' }}
                                color={useColorModeValue('gray.600', 'gray.300')}
                            >
                                {media?.Plot}
                            </chakra.p>
                            <Flex direction="row" mx="auto" mb="25px">
                                {genre.map((genero) => (
                                    <Badge
                                        rounded="full"
                                        w="100px"
                                        px="3"
                                        variant="outline"
                                        colorScheme="teal"
                                        ml="4"
                                    >
                                        {genero}
                                    </Badge>
                                ))}
                            </Flex>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                mb={{ base: 4, md: 8 }}
                                spacing={2}
                                justifyContent={{ sm: 'left', md: 'center' }}
                            >
                                <Button
                                    href="#player"
                                    as="a"
                                    colorScheme="teal"
                                    display="inline-flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    w={{ base: 'full', sm: 'auto' }}
                                    mb={{ base: 2, sm: 0 }}
                                    size="lg"
                                    cursor="pointer"
                                    onClick={() => setPlay(true)}
                                >
                                    Go to player
                                    <Icon boxSize={4} ml={2} viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </Icon>
                                </Button>
                                <Button
                                    as="a"
                                    colorScheme="pink"
                                    display="inline-flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    w={{ base: 'full', sm: 'auto' }}
                                    mb={{ base: 2, sm: 0 }}
                                    size="lg"
                                    cursor="pointer"
                                >
                                    See comments
                                    <Icon boxSize={4} ml={2} viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                                            clipRule="evenodd"
                                        />
                                    </Icon>
                                </Button>
                            </Stack>
                        </Flex>
                    </Flex>
                </Box>
                <Box maxW="7xl" mx={'auto'} px={{ base: 2, sm: 12, md: 17 }} my="20px">
                    <Wrap spacing="25px" padding="5" justify="center" mr="10px">
                        <SimpleGrid columns={{ base: 1, md: 5 }} spacing={{ base: 7, lg: 15 }}>
                            <StatsCard title={'Year'} stat={year} icon={<MdLayers size={'2em'} />} />
                            <StatsCard
                                title={'Director'}
                                stat={media?.Director || 'N/A'}
                                icon={<GiDirectorChair size={'2em'} />}
                            />
                            <StatsCard
                                title={'Rating'}
                                stat={media?.imdbRating || 'N/A'}
                                icon={<IoMdStarOutline size={'2em'} />}
                            />
                            <StatsCard
                                title={'Total Votes'}
                                stat={media?.imdbVotes || 'N/A'}
                                icon={<FaVoteYea size={'2em'} />}
                            />
                            <StatsCard
                                title={'Duration'}
                                stat={media?.Runtime || 'N/A'}
                                icon={<MdOutlineWatchLater size={'2em'} />}
                            />
                        </SimpleGrid>
                    </Wrap>
                </Box>
            </Box>
            <section id="player">
                <Box w="100vh" maxW="full" h="66vh" mx={'auto'} mb="10" textAlign="center">
                    <ReactPlayer
                        controls
                        playing={play}
                        volume={0.15}
                        url="https://www.youtube.com/watch?v=jtzx5I03JpY"
                    />
                </Box>
            </section>
        </>
    );
};
