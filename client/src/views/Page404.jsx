import React from 'react';
import { Image, Button, Flex, chakra } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import emote from '../assets/emote.png';

const Page404 = () => {
    return (
        <div>
            <Flex ps="5">
                <Image src={emote} />
                <Flex direction="column" pt="150">
                    <chakra.h2 fontSize="20px" colorScheme="teal">
                        {' '}
                        Sorry, we have nothing to show !
                    </chakra.h2>
                    <Link to="/">
                        <Button
                            letterSpacing={3}
                            mt="3"
                            size="md"
                            height="48px"
                            width="200px"
                            border="2px"
                            px="5"
                            borderColor="teal.500"
                        >
                            GO TO HOME
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </div>
    );
};

export default Page404;
