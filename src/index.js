import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
theme.config.initialColorMode = 'dark'
root.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
);