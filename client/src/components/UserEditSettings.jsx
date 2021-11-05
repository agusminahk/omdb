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
    chakra,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Page404 from '../views/Page404';
import { successToast } from '../helpers/toastMessages';
import { sendUpdateRequest } from '../state/user';

const SignUpForm = () => {
    const toast = useToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(({ user }) => user);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const reUser = /^[a-zA-Z0-9]*$/;
    const reSp = /^[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~*]*$/;

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    function onSubmit({ confirmPass, username }) {
        dispatch(sendUpdateRequest({ username, password: confirmPass, id: user._id })).then(() => {
            successToast(toast, 'Your user has been edited correctly!');
            history.push('/');
        });
    }

    if (!user.email)
        return (
            <>
                <Page404 />
            </>
        );

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex minH={'100vh'} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'} rounded={'xl'} boxShadow={'lg'} mt={-12} p={6}>
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                            <chakra.h3 ml="20">Edit Profile &#128397;</chakra.h3>
                        </Heading>

                        <FormControl isInvalid={reSp.test(username) && errors.username}>
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
                        <FormControl isInvalid={errors.email}>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input isDisabled type="email" value={email} _placeholder={{ color: 'gray.500' }} />
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={password.length < 8 && errors.password} id="password">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                type="password"
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
                        <FormControl
                            isInvalid={password.length < 8 && errors.password && confirmPass != password}
                            id="password"
                            isRequired
                        >
                            <FormLabel htmlFor="confirmPass">Confirm Password</FormLabel>
                            <Input
                                type="text"
                                id="email"
                                {...register('confirmPass', {
                                    required: 'Password is Required',
                                    minLength: { value: 8, message: 'Passwords not equals' },
                                })}
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
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
