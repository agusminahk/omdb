import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import bixbax from '../assets/bixbax.svg';
import useLogin from '../hooks/useLogin.js';

const SignInForm = () => {
    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);

    const { email, setEmail, password, setPassword, showPassword, setShowPassword, handleSubmit } =
        useLogin();

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <>
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                    <Avatar bg="black.800" src={bixbax} size="xl" />
                    <Heading color="teal.400">Welcome</Heading>
                    <Box minW={{ base: '90%', md: '468px' }} onSubmit={handleSubmit}>
                        <form>
                            <Stack spacing={4} p="1rem" boxShadow="md">
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color="gray.300" />}
                                        />
                                        <Input
                                            type="email"
                                            placeholder="your-email@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={<CFaLock color="gray.300" />}
                                        />
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="*******"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="teal"
                                    width="full"
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box display="flex" p="1">
                    New to us?
                    <Link to="/signup">
                        <chakra.h3 color="teal" ml="5" variant="outline">
                            Sign Up
                        </chakra.h3>
                    </Link>
                </Box>
            </Flex>
        </>
    );
};

export default SignInForm;
