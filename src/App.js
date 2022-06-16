import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Home from "./Pages/Home"
import Settings from "./Pages/Settings"
import ChannelPoints from "./Pages/ChannelPoints";
import Bits from "./Pages/Bits";
import Subs from "./Pages/Subs";
import Navbar from "./Components/Navbar"
import TwitchAuth from "./Pages/TwitchAuth";
import Version from './Components/Version';

const App = () => {

    return (
      <>
        <Router basename="/react-obs-control">
          <ChakraProvider>
            <Flex>
              <Navbar />
            </Flex>
            <Routes>
              <Route path="/" element={
                <Home />
              } />

              <Route path="/Settings" element={
                <Settings />
              } />

              <Route path="/auth" element={
                <TwitchAuth />
              } />

              <Route path="/ChannelPoints" element={
                <ChannelPoints />
              } />

              <Route path="/Bits" element={
                <Bits />
              } />

              <Route path="/Subscriptions" element={
                <Subs />
              } />
            </Routes>
          </ChakraProvider>
        </Router>
        <Version />
      </>
    )
}

export default App;
