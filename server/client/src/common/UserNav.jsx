import React from 'react';
import {
    Flex,
    HStack,
    Button,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CgUserlane, CgProfile } from 'react-icons/cg';
import { FaEye } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { handleLogout } from '../helpers/functions';

const UserNav = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div>
            <HStack spacing={5} mr={5} color="brand.500" display={{ base: 'none', md: 'inline-flex' }}>
                <Button onClick={() => history.push('/media/movie')} variant="ghost">
                    Movie
                </Button>

                <Button onClick={() => history.push('/media/serie')} variant="ghost">
                    Serie
                </Button>

                <Button onClick={() => history.push('/users')} variant="ghost">
                    Users
                </Button>

                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
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
                                    handleLogout(dispatch, history);
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
            </HStack>
        </div>
    );
};

export default UserNav;
