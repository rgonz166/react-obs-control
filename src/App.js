import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import Home from "./Pages/Home"
import Settings from "./Pages/Settings"
import Navbar from "./Components/Navbar"
import OBSWebSocket from "obs-websocket-js";
import Version from './Components/Version';


const obs = new OBSWebSocket();

const App = () => {
  const toast = useToast();
  const [scenes, setScenes] = useState([])
  const [sources, setSources] = useState([])
  const [obsConnected, setObsConnected] = useState(false)
  const [ obsPort, setOBSPort ] = useState('4444')
  const [ obsPassword, setOBSPassword ] = useState('')

    const connectObs =  () => {
        obs.connect({address: `localhost:${obsPort}`, password: obsPassword}).then(() => {
            setObsConnected(true);
            obs.send('GetSceneList')
            .then( data => {
                setScenes(data.scenes);
                if (data.scenes && data.scenes.length > 0) {
                  setSources(data.scenes[0].sources)
                }
            })
            toast({
              title: `OBS Connected`,
              description: 'OBS Connection has been successfully established',
              status: 'success',
              duration: 7000,
              isClosable: true
            })
        }).catch(rejected => {
            setObsConnected(false)
            setScenes([]);
            setSources([]);
            toast({
              title: `OBS Connection Unsuccessful`,
              description: 'OBS Connection has not been successfully established, verify port and password have been entered correctly in settings.',
              status: 'error',
              duration: 15000,
              isClosable: true
            })
            console.error('rejected', rejected)
        })
        // await obs.connect('ws://localhost:4444', '123456')
    }

    const disconnectObs = () => {
        setObsConnected(false);
        setScenes([]);
        setSources([]);
        obs.disconnect();
        toast({
          title: `OBS Disconnected`,
          description: 'OBS Connection has been successfully disconnected',
          status: 'success',
          duration: 7000,
          isClosable: true
        })
    }

    const getSceneList = () => {
        console.log('scenes', scenes)
    }

    const getSourcesList = () => {
        console.log('sources', sources)
    }

    const getOBSPort = () => {
        console.log('port:', obsPort)
    }



    return (
      <>
        <Router basename="/react-obs-control">
          <ChakraProvider>
            <Flex>
              <Navbar />
            </Flex>
            <Routes>
              <Route path="/" element={
                <Home
                  obsConnected={obsConnected}
                  connectObs={connectObs}
                  disconnectObs={disconnectObs}
                  getSceneList={getSceneList}
                  getSourcesList={getSourcesList}
                  getOBSPort={getOBSPort}
                />
              } />
              <Route exact path="/Settings" element={
                <Settings
                  obsPort={obsPort}
                  obsPassword={obsPassword}
                  setOBSPort={setOBSPort}
                  setOBSPassword={setOBSPassword}
                />
              } />
              <Route  />
            </Routes>
          </ChakraProvider>
        </Router>
        <Version />
      </>
    )
  
}

export default App;
