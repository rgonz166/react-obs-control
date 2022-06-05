import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Home from "./Pages/Home"
import Settings from "./Pages/Settings"
import Navbar from "./Components/Navbar"

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <ChakraProvider>
            <Flex>
              <Navbar />
            </Flex>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Settings" element={<Settings />} />
              <Route  />
            </Routes>
          </ChakraProvider>
        </Router>
      </>
    )
  };
  
}

export default App;
