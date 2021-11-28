import { extendTheme } from '@chakra-ui/react';

// Add color mode config
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
