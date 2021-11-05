import React from 'react';
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
    Input,
    InputGroup,
    InputLeftElement,
    Image,
} from '@chakra-ui/react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import bixbax from '../assets/bixbax.svg';

import Header from '../components/Header';
import GeneralSearch from '../components/GeneralSearch';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = () => {
    const history = useHistory();
    const bg = useColorModeValue('white', 'gray.800');
    const mobileNav = useDisclosure();

    return (
        <div>
            <chakra.header bg={bg} w="100%" pos="relative" px={{ base: 2, sm: 2 }} py={4} shadow="md" zIndex="30">
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <Link to="/">
                        <Flex>
                            <Image boxSize="50px" src={bixbax} objectFit="cover" alt="bixbax logo" ml="3" />
                            <chakra.h1 display="block" fontSize="3xl" fontWeight="medium" ml="2" letterSpacing={5}>
                                BIXBAX
                            </chakra.h1>
                        </Flex>
                    </Link>
                    <HStack display="flex" alignItems="center" ml="60px" mr="-20px" spacing={1} justify="center">
                        <GeneralSearch></GeneralSearch>
                    </HStack>
                    <HStack display="flex" alignItems="center" spacing={1} mr={10} ml={3}>
                        <Header />

                        {/* MOBILE NAV */}

                        <Box display={{ base: 'inline-flex', md: 'none' }}>
                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                aria-label="Open menu"
                                fontSize="23px"
                                ml="5"
                                color={useColorModeValue('gray.800', 'inherit')}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />

                            <VStack
                                pos="absolute"
                                top={0}
                                left={0}
                                right={0}
                                display={mobileNav.isOpen ? 'flex' : 'none'}
                                flexDirection="column"
                                p={2}
                                pb={4}
                                m={2}
                                bg={bg}
                                spacing={3}
                                rounded="sm"
                                shadow="sm"
                            >
                                <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />

                                <Button w="full" variant="ghost">
                                    Movie
                                </Button>
                                <Button w="full" variant="ghost">
                                    Serie
                                </Button>
                                <Button w="full" variant="ghost">
                                    Category
                                </Button>
                                <Button w="full" variant="ghost">
                                    Sign in
                                </Button>
                                <Button w="90%" colorScheme="pink" variant="solid">
                                    Sign up
                                </Button>
                            </VStack>
                        </Box>
                    </HStack>
                </Flex>
            </chakra.header>
        </div>
    );
};

export default NavBar;
