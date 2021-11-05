import { useState } from 'react';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    useToast,
    Box,
    Avatar,
    FormControl,
    InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import bixbax from '../assets/bixbax.svg';
import { sendLoginRequest } from '../state/user';
import { successToast, errorToast } from '../helpers/toastMessages';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignInForm = () => {
    const toast = useToast();
    const history = useHistory();
    const dispatch = useDispatch();
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(sendLoginRequest({ email, password }))
                .then((res) => {
                    if (res.payload) {
                        successToast(toast, `Welcome ${res.payload.username}`);
                        history.push('/');
                    } else {
                        errorToast(toast, `Wrong email or password`);
                    }
                })

                .catch((err) => ({ err: err.message }));
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <>
            <Flex flexDirection="column" width="100wh" height="100vh" justifyContent="center" alignItems="center">
                <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                    <Avatar bg="black.800" src={bixbax} size="xl" />
                    <Heading color="teal.400">Welcome</Heading>
                    <Box minW={{ base: '90%', md: '468px' }} onSubmit={handleSubmit}>
                        <form>
                            <Stack spacing={4} p="1rem" boxShadow="md">
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
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
                                <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full">
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
