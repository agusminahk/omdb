import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

import { setSearch } from '../state/search';

const GeneralSearch = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    async function _handleKeyDown(e) {
        if (e.key === 'Enter') {
            try {
                let search = [];
                const res = await axios.get(`/api/media/content/${input}`);
                const [movies, series] = res.data;
                search = [movies, series];

                const { data: userData } = await axios.post('/api/user', { userLike: input });
                search = [...search, userData];
                dispatch(setSearch(search));

                history.push('/search');
            } catch (err) {
                console.log({ err: err.message });
            }
        }
    }
    return (
        <div>
            <InputGroup>
                <InputLeftElement pointerEvents="none" pos="absolute" children={<AiOutlineSearch />} />
                <Input
                    type="tel"
                    placeholder="Search..."
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    value={input}
                    onKeyDown={(e) => {
                        _handleKeyDown(e);
                    }}
                />
            </InputGroup>
        </div>
    );
};

export default GeneralSearch;
