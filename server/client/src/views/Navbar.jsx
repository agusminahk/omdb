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
    Image,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CgUserlane, CgProfile } from 'react-icons/cg';
import { FaEye } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { handleLogout } from '../helpers/functions';
import bixbax from '../assets/bixbax.svg';
import Header from '../components/Header';
import GeneralSearch from '../components/GeneralSearch';

const NavBar = () => {
    const user = useSelector(({ user }) => user);
    const history = useHistory();
    const bg = useColorModeValue('white', 'gray.800');
    const mobileNav = useDisclosure();

    return (
        <div>
            <chakra.header
                bg={bg}
                w="100%"
                pos="relative"
                px={{ base: 2, sm: 2 }}
                py={4}
                shadow="md"
                zIndex="30"
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <Link to="/">
                        <Flex>
                            <Image boxSize="50px" src={bixbax} objectFit="cover" alt="bixbax logo" ml="3" />
                            <chakra.h1
                                display="block"
                                fontSize="3xl"
                                fontWeight="medium"
                                ml="2"
                                letterSpacing={5}
                            >
                                BIXBAX
                            </chakra.h1>
                        </Flex>
                    </Link>
                    <HStack
                        display="flex"
                        alignItems="center"
                        ml="60px"
                        mr="-20px"
                        spacing={1}
                        justify="center"
                    >
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
                                rounded="xl"
                                shadow="2xl"
                                zIndex="40"
                            >
                                <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
                                {user.email && (
                                    <Flex alignItems={'center'}>
                                        <Menu>
                                            <MenuButton
                                                as={Button}
                                                rounded={'full'}
                                                variant={'link'}
                                                cursor={'pointer'}
                                                minW={0}
                                            >
                                                <Icon as={CgUserlane} w={10} h={10} color="teal.300" />
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => history.push('/users/profile')}
                                                    _hover={{ color: 'pink.200' }}
                                                    icon={<CgProfile />}
                                                >
                                                    My Profile
                                                </MenuItem>

                                                <MenuItem
                                                    onClick={() => history.push('/users/profile/settings')}
                                                    _hover={{ color: 'pink.200' }}
                                                    icon={<FaEye />}
                                                >
                                                    Account Settings
                                                </MenuItem>
                                                <MenuDivider />

                                                <MenuItem
                                                    onClick={() => {
                                                        handleLogout();
                                                        history.push('/');
                                                        //history.go();
                                                    }}
                                                    minWidth="240px"
                                                    icon={<FiLogOut />}
                                                    _hover={{ color: 'pink.200' }}
                                                >
                                                    Logout
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Flex>
                                )}
                                <Link to="/media/movie">
                                    <Button w="full" variant="ghost" onClick={mobileNav.onClose}>
                                        Movie
                                    </Button>
                                </Link>
                                <Link to="/media/serie">
                                    <Button w="full" variant="ghost" onClick={mobileNav.onClose}>
                                        Serie
                                    </Button>
                                </Link>
                                <Link to="/users">
                                    <Button w="full" variant="ghost" onClick={mobileNav.onClose}>
                                        Users
                                    </Button>
                                </Link>

                                {!user.email && (
                                    <>
                                        <Link to="/signin">
                                            <Button
                                                w="90%"
                                                colorScheme="teal"
                                                variant="outline"
                                                onClick={mobileNav.onClose}
                                            >
                                                Sign in
                                            </Button>
                                        </Link>
                                        <Link to="/signup">
                                            <Button
                                                w="90%"
                                                colorScheme="pink"
                                                variant="outline"
                                                onClick={mobileNav.onClose}
                                            >
                                                Sign up
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </VStack>
                        </Box>
                    </HStack>
                </Flex>
            </chakra.header>
        </div>
    );
};

export default NavBar;
