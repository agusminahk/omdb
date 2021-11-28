import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Provider } from 'react-redux';
import { store } from './state/store';

import App from './views/App.jsx';
import theme from './config/theme'; // it's dark by default

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
