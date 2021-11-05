import { Stat, Box, useColorModeValue, StatLabel, StatNumber, Flex, WrapItem } from '@chakra-ui/react';
import React from 'react';

const StatsCard = ({ title, stat, icon }) => {
    return (
        <WrapItem>
            <Box w="200px" h="50px">
                <Stat
                    px={{ base: 2, md: -100 }}
                    py={'1'}
                    shadow={'xl'}
                    border={'1px solid'}
                    borderColor={useColorModeValue('gray.800', 'gray.500')}
                    rounded={'lg'}
                >
                    <Flex justifyContent={'space-around'}>
                        <Box my={'auto'} color={useColorModeValue('gray.800', 'white')} alignContent={'center'}>
                            {icon}
                        </Box>
                        <Box my={'auto'} pl={{ base: 3, md: 6 }}>
                            <StatLabel fontSize={'sm'} fontWeight={'semi-bold'} isTruncated>
                                {title}
                            </StatLabel>
                            <StatNumber my={'auto'} fontSize={'sm'} fontWeight={'bold'}>
                                {stat}
                            </StatNumber>
                        </Box>
                    </Flex>
                </Stat>
            </Box>
        </WrapItem>
    );
};

export default StatsCard;
