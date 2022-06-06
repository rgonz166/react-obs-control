import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import Home from "./Pages/Home"
import Settings from "./Pages/Settings"
import ChannelPoints from "./Pages/ChannelPoints";
import Navbar from "./Components/Navbar"
import OBSWebSocket from "obs-websocket-js";
import Version from './Components/Version';
import { setSelectionRange } from "@testing-library/user-event/dist/utils";


const obs = new OBSWebSocket();

const App = () => {
  const toast = useToast();
  const [scenes, setScenes] = useState([])
  const [sources, setSources] = useState([])
  const [obsConnected, setObsConnected] = useState(false)
  const [ obsPort, setOBSPort ] = useState('4444')
  const [ obsPassword, setOBSPassword ] = useState('123456')
  const [ sceneSelected, setSceneSelected ] = useState('')
  const [ sourceSelected, setSourceSelected ] = useState('')
  

    const connectObs =  () => {
        obs.connect({address: `localhost:${obsPort}`, password: obsPassword}).then(() => {
            setObsConnected(true);
            obs.send('GetSceneList')
            .then( data => {
                setScenes(data.scenes);
                // if (data.scenes && data.scenes.length > 0) {
                //   setSources(data.scenes[0].sources)
                // }
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

    const handleSceneSelection = (scene) => {
      if(!scene) {
        setSceneSelected('')
        setSources([])
      } else {
        setSceneSelected(scene)
        const selectedScene =  scenes.find((s) => s.name === scene)
        console.log(selectedScene)
        setSources(selectedScene.sources)
      }
    }

    const handleSourceSelection = (source) => {
      console.log('source:',source)
        setSourceSelected(source)
        console.log('sourceSelected:',sourceSelected)
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
              <Route exact path="/ChannelPoints" element={
              <ChannelPoints 
                  scenes={scenes}
                  sources={sources}
                  obsConnected={obsConnected}
                  handleSceneSelection={handleSceneSelection}
                  handleSourceSelection={handleSourceSelection}
                  
              />
              } />
            </Routes>
          </ChakraProvider>
        </Router>
        <Version />
      </>
    )
  
}

export default App;
