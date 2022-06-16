import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import './index.css';
import App from './App';
import { ObsProvider } from 'Contexts/ObsContext';
import { TwitchProvider } from 'Contexts/TwitchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
theme.config.initialColorMode = 'dark'
root.render(
    <ChakraProvider theme={theme}>
        <ObsProvider>
            <TwitchProvider>
                <App />
            </TwitchProvider>
        </ObsProvider>
    </ChakraProvider>
);