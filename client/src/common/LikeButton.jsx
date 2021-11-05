import React, { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';

const HeartBtn = ({ id }) => {
    const [active, setActive] = useState('default');

    return (
        <div>
            <Button
                bgColor={active}
                onClick={() => (active === 'default' ? setActive('red.700') : setActive('default'))}
                w="90px"
                h="29px"
                leftIcon={<FiHeart />}
                _hover={{ bg: 'red.700' }}
                _active={{ border: 'none' }}
                rounded="full"
                mx="auto"
            >
                <Text fontSize={'md'} mx="auto" fontWeight="semi-bold">
                    Like
                </Text>
            </Button>
        </div>
    );
};

export default HeartBtn;
