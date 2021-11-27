import React from 'react';
import { chakra, Box, Image, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import user_png from '../assets/icon_user_list.png';

const UserCard = ({ user }) => {
    return (
        <Box
            w="15rem"
            bgGradient="linear(to-b, teal.600, pink.200)"
            rounded="3xl"
            _hover={{
                transform: 'scale(1.03)',
            }}
            _focus={{ boxShadow: 'outline' }}
            transition="0.1s linear"
        >
            <Flex p={'20px'} w="full" alignItems="center" justifyContent="center">
                <Box w="xxs" h="xs" shadow="lg" rounded="lg" overflow="hidden" mx="auto">
                    <Image w="full" h={56} objectFit="contain" src={user_png} alt="avatar" />

                    <Box py={5} textAlign="center">
                        <chakra.h2 mt="-12px" display="block" fontSize="xl" color="white" fontWeight="bold">
                            {user?.username || 'user'}
                        </chakra.h2>
                        <Link to={`/users/${user._id}`}>
                            <chakra.span fontWeight="bold" fontSize="md" color={useColorModeValue('white')}>
                                USER PROFILE
                            </chakra.span>
                            <Box w="15%" mx="auto" borderBottom="2px solid teal" />
                        </Link>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default UserCard;
