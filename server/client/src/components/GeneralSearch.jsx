import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

import useInput from '../hooks/useInput';

const GeneralSearch = () => {
    const { input, setInput, _handleKeyDown } = useInput();

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
                    onKeyDown={(e) => _handleKeyDown(e)}
                />
            </InputGroup>
        </div>
    );
};

export default GeneralSearch;
