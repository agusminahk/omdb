import React, { useState } from 'react';
import axios from 'axios';
import {
    FormErrorMessage,
    Button,
    useToast,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    chakra,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { sendLoginRequest } from '../state/user';
import { successToast } from '../helpers/toastMessages';

const SignUpForm = () => {
    const toast = useToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const reUser = /^[a-zA-Z0-9_.-]*$/;
    const reSp = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~*]/;

    let {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    function onSubmit({ email, password, username }) {
        axios.post('/api/auth/signup', { email, password, username }).then((res) => {
            if (res.status === 200) {
                dispatch(sendLoginRequest({ email, password })).then((res) => {
                    successToast(toast, 'Account created', `Yor account has been created. Enjoy!`);
                    history.push('/');
                });
            }
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                >
                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'md'}
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        mt={-12}
                        p={6}
                    >
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                            <chakra.h3 ml="40" id="join-us">
                                Join us &#129322;
                            </chakra.h3>
                        </Heading>

                        <FormControl isInvalid={reSp.test(username) && errors.username} isRequired>
                            <FormLabel htmlFor="name">Username</FormLabel>
                            <Input
                                id="username"
                                placeholder="Your Username"
                                {...register('username', {
                                    required: 'Allow only numbers and characters',
                                    pattern: {
                                        value: reUser,
                                        message: 'Allow Only numbers and characters',
                                    },
                                    minLength: { value: 3, message: 'Minimum length should be 3' },
                                })}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                            />
                            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.email} isRequired>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: 'Email is Required',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your-email@example.com"
                                _placeholder={{ color: 'gray.500' }}
                            />
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={password.length < 8 && errors.password}
                            id="password"
                            isRequired
                        >
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="email"
                                {...register('password', {
                                    required: 'Password is Required',
                                    minLength: { value: 8, message: 'Password minimun length should be 8' },
                                })}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                _placeholder={{ color: 'gray.500' }}
                                type="password"
                            />
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>

                        <Stack spacing={6} direction={['column', 'row']}>
                            <Button
                                type="submit"
                                bg={'teal'}
                                color={'white'}
                                w="full"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSubmit(onSubmit);
                                }}
                                _hover={{
                                    bg: 'teal.400',
                                }}
                                isLoading={isSubmitting}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </form>
        </>
    );
};
export default SignUpForm;
