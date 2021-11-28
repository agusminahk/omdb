import React, { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';

const ActiveFav = () => {
    const [active, setActive] = useState('red.700');

    return (
        <div>
            <Button
                bgColor={active}
                onClick={() => (active === 'red.700' ? setActive('default') : setActive('red.700'))}
                variant="outline"
                w="90px"
                h="29px"
                leftIcon={<FiHeart />}
                _hover={{ bg: 'red.700' }}
                _active={{ border: 'none' }}
                rounded="full"
                mx="auto"
            >
                <Text fontSize={'md'} fontWeight="semi-bold">
                    Like
                </Text>
            </Button>
        </div>
    );
};

export default ActiveFav;
