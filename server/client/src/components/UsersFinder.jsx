import React from 'react';
import { Avatar, Text, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useSelector } from 'react-redux';

import UserCard from '../common/UserCard';
import Navbar from '../views/Navbar';
import '../views/Spinner.css';
import useInput from '../hooks/useInput';

const Users = () => {
    const users = useSelector((state) => state.allUsers);
    const { input, setInput } = useInput();

    if (!users)
        return (
            <>
                <Navbar />
                <div className="spinner">
                    <div className="cube1"></div>
                    <div className="cube2"></div>
                </div>
            </>
        );

    return (
        <>
            <Flex direction="column" boxSize="full" h="100vh" pos="absolute" p={30} justifyContent="top">
                <AutoComplete rollNavigation>
                    <AutoCompleteInput
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        variant="filled"
                        placeholder="Search users..."
                        autoFocus
                    />
                    <AutoCompleteList>
                        {users.map(({ username, _id }) => (
                            <AutoCompleteItem
                                onFocus={() => window.scrollTo(0, 0)}
                                onClick={(e) => {
                                    setInput('');
                                    setInput(e.target.innerText);
                                }}
                                key={_id}
                                value={username}
                                textTransform="capitalize"
                                align="center"
                            >
                                <Avatar size="sm" name={username} />
                                <Text ml="4">{username}</Text>
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                </AutoComplete>
                <Flex direction="row" my="50px">
                    {
                        <Wrap spacing="10px" padding="5" justify="center" mr="10px">
                            {users.map((user, i) => (
                                <WrapItem key={i}>
                                    <UserCard key={user._id} user={user} id={`user-${i}`} />
                                </WrapItem>
                            ))}
                        </Wrap>
                    }
                </Flex>
            </Flex>
        </>
    );
};

export default Users;
