import React from 'react';
import { HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const DefaultNav = () => {
    return (
        <div>
            <HStack spacing={5} mr={5} color="brand.500" display={{ base: 'none', md: 'inline-flex' }}>
                <Link to="/media/movie">
                    <Button variant="ghost">Movie</Button>
                </Link>
                <Link to="/media/serie">
                    <Button variant="ghost">Serie</Button>
                </Link>
                <Link to="/users">
                    <Button variant="ghost">Users</Button>
                </Link>
                <Link to="/signin">
                    <Button colorScheme="teal" variant="outline">
                        Sign in
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button colorScheme="pink" variant="outline">
                        Sign Up
                    </Button>
                </Link>
            </HStack>
        </div>
    );
};

export default DefaultNav;
