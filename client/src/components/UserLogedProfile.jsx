import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Image,
    Center,
    Heading,
    Text,
    VStack,
    Flex,
    ButtonGroup,
    Button,
    IconButton,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
} from '@chakra-ui/react';

import iconUser from '../assets/icon_user_list.png';
import { deleteFav } from '../state/favs.js';
import Page404 from '../views/Page404';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const favs = useSelector((state) => state.favs);

    const header = ['Name', 'Type', 'Actions'];

    if (!user.email)
        return (
            <>
                <Page404 />
            </>
        );

    return (
        <>
            <Container mt={4}>
                <Image src={iconUser} alt={user?.username} boxSize="200px" borderRadius="full" mx="auto" />
                <Center>
                    <VStack>
                        <Heading>{user?.username}</Heading>
                        <Text color="gray">
                            {user?.email} {', '} {'Some part of the world'}
                        </Text>
                        <Button
                            as="text"
                            fontSize="3xl"
                            color="white"
                            background="pink.500"
                            variant="solid"
                            _hover={{ background: 'pink.500' }}
                        >
                            {'Favorites'}
                        </Button>
                    </VStack>
                </Center>
            </Container>
            <Flex w="full" p={50} alignItems="center" justifyContent="center">
                <Table
                    w="full"
                    display={{
                        base: 'block',
                        md: 'table',
                    }}
                    sx={{
                        '@media print': {
                            display: 'table',
                        },
                    }}
                >
                    <Thead
                        display={{
                            base: 'none',
                            md: 'table-header-group',
                        }}
                        sx={{
                            '@media print': {
                                display: 'table-header-group',
                            },
                        }}
                    >
                        <Tr>
                            {header.map((x) => (
                                <Th key={x}>{x}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody
                        display={{
                            base: 'block',
                            lg: 'table-row-group',
                        }}
                        sx={{
                            '@media print': {
                                display: 'table-row-group',
                            },
                        }}
                    >
                        {favs.length
                            ? favs.map((token, tid) => {
                                  return (
                                      <Tr
                                          key={tid}
                                          display={{
                                              base: 'grid',
                                              md: 'table-row',
                                          }}
                                          sx={{
                                              '@media print': {
                                                  display: 'table-row',
                                              },
                                              gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
                                              gridGap: '10px',
                                          }}
                                      >
                                          {Object.keys(token).map((x) => {
                                              if (x === 'Title' || x === 'Type') {
                                                  return (
                                                      <React.Fragment key={`${tid}${x}`}>
                                                          <Td
                                                              display={{
                                                                  base: 'table-cell',
                                                                  md: 'none',
                                                              }}
                                                              sx={{
                                                                  '@media print': {
                                                                      display: 'none',
                                                                  },
                                                                  textTransform: 'uppercase',
                                                                  color: 'gray.400',
                                                                  fontSize: 'xs',
                                                                  fontWeight: 'bold',
                                                                  letterSpacing: 'wider',
                                                                  fontFamily: 'heading',
                                                              }}
                                                          >
                                                              {token[x]}
                                                          </Td>
                                                          <Td color="white" fontSize="md" fontWeight="hairline">
                                                              {token[x]}
                                                          </Td>
                                                      </React.Fragment>
                                                  );
                                              }
                                          })}
                                          <Td
                                              display={{
                                                  base: 'table-cell',
                                                  md: 'none',
                                              }}
                                              sx={{
                                                  '@media print': {
                                                      display: 'none',
                                                  },
                                                  textTransform: 'uppercase',
                                                  color: 'white',
                                                  fontSize: 'xs',
                                                  fontWeight: 'bold',
                                                  letterSpacing: 'wider',
                                                  fontFamily: 'heading',
                                              }}
                                          >
                                              Actions
                                          </Td>
                                          {Object.keys(token).map((x) => {
                                              if (x === 'imdbID') {
                                                  return (
                                                      <React.Fragment>
                                                          <Td>
                                                              <ButtonGroup variant="solid" size="sm" spacing={18}>
                                                                  <Link to={`/media/${token[x]}`}>
                                                                      <IconButton
                                                                          colorScheme="blue"
                                                                          icon={<BsBoxArrowUpRight />}
                                                                      />
                                                                  </Link>

                                                                  <IconButton
                                                                      colorScheme="red"
                                                                      variant="outline"
                                                                      icon={<BsFillTrashFill />}
                                                                      onClick={() => {
                                                                          dispatch(
                                                                              deleteFav({ user_id: user._id, media_id: token[x] })
                                                                          );
                                                                          history.push('/users/profile');
                                                                      }}
                                                                  />
                                                              </ButtonGroup>
                                                          </Td>
                                                      </React.Fragment>
                                                  );
                                              }
                                          })}
                                      </Tr>
                                  );
                              })
                            : []}
                    </Tbody>
                </Table>
            </Flex>
        </>
    );
};

export default AdminProfile;
