import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MediaCard from '../common/MediaCard';
import { Flex, Wrap, WrapItem, Button } from '@chakra-ui/react';

const INITIAL_VALUE = 0;

const GridMedia = ({ content, type }) => {
    const [currentPage, setCurrentPage] = useState(INITIAL_VALUE);
    const nextPage = () => (currentPage < content.length - 24 ? setCurrentPage(currentPage + 24) : null);
    const prevPage = () => (currentPage > 23 ? setCurrentPage(currentPage - 24) : null);

    let media = content.slice(currentPage, currentPage + 24);
    const location = useLocation();

    useEffect(() => {
        setCurrentPage(INITIAL_VALUE);
        media = content.slice(currentPage, currentPage + 24);
    }, [location.pathname]);

    return (
        <>
            {' '}
            <Flex direction="column">
                <Flex direction="row">
                    <Wrap spacing="70px" justify="center" mr="10px">
                        {media.map((item, i) => {
                            if (item.Type === type) {
                                return (
                                    <WrapItem key={i}>
                                        <MediaCard key={item.imdbID} item={item} id={item.imdbID} />
                                    </WrapItem>
                                );
                            }
                        })}
                    </Wrap>
                </Flex>
                <Flex direction="row" mx="auto" my="50px">
                    <Button variant="outline" colorScheme="teal" mx="20px" onClick={prevPage}>
                        PREV
                    </Button>
                    <Button variant="outline" colorScheme="teal" mx="20px" onClick={nextPage}>
                        NEXT
                    </Button>
                </Flex>
            </Flex>
        </>
    );
};

export default GridMedia;
