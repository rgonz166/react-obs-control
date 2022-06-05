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
        <ChakraProvider>
            <Flex>
              <Navbar />
            </Flex>
          <Router>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Settings" element={<Settings />} />
              <Route  />
            </Routes>
          </Router>
        </ChakraProvider>
      </>
    )
  };
  
}

export default App;
