import React from 'react';
import {
    FormErrorMessage,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import useRegister from '../hooks/useRegister.js';

const SignUpForm = () => {
    const { username, setUsername, email, setEmail, password, setPassword, onSubmit } = useRegister();

    const reSp = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~*]/;

    let {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

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
                            <Text ml="40" id="join-us">
                                Join us &#129322;
                            </Text>
                        </Heading>

                        <FormControl isInvalid={reSp.test(username) && errors.username} isRequired>
                            <FormLabel htmlFor="name">Username</FormLabel>
                            <Input
                                id="username"
                                placeholder="Your Username"
                                {...register('username', {
                                    required: 'Allow only numbers and characters',
                                   
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
