import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import './index.css';
import App from './App';
import { ObsProvider } from 'Contexts/ObsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme}>
        <ObsProvider>
            <App />
        </ObsProvider>
    </ChakraProvider>
);