import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import Home from "./Pages/Home"
import Settings from "./Pages/Settings"
import ChannelPoints from "./Pages/ChannelPoints";
import Bits from "./Pages/Bits";
import Subs from "./Pages/Subs";
import Navbar from "./Components/Navbar"
import TwitchAuth from "./Pages/TwitchAuth";
import OBSWebSocket from "obs-websocket-js";
import Version from './Components/Version';
import ComfyJS from "comfy.js";

const obs = new OBSWebSocket();

const App = () => {
 
  const toast = useToast();
  const [scenes, setScenes] = useState([])
  const [sources, setSources] = useState([])
  const [twitchConnected, setTwitchConnected] = useState(false)
  const [obsConnected, setObsConnected] = useState(false)
  const [ twitchUsername, setTwitchUsername] = useState(() => {
    const saved = localStorage.getItem('twitchUsername');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  });
  const [ obsPort, setOBSPort ] = useState(() => {
    const saved = localStorage.getItem('obsPort');
    const initialValue = JSON.parse(saved);
    return initialValue || '4444';
  })
  const [ obsPassword, setOBSPassword ] = useState(() => {
    const saved = localStorage.getItem('obsPassword');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  })
  const [ token, setToken ] = useState(() => {
    const saved = localStorage.getItem('twitchToken');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  });
  const [ sceneSelected, setSceneSelected ] = useState('')
  const [ sourceSelected, setSourceSelected ] = useState('')
  
  useEffect(() => {
    ComfyJS.onConnected = () => {
      setTwitchConnected(true)
      toast({
        title: `Twitch Connected`,
        description: 'Twitch Connection has been successfully established',
        status: 'success',
        duration: 7000,
        isClosable: true
      })
    }

    ComfyJS.onChat = (user, message, flags, self, extra) => {
      console.log('user', user);
      console.log('message', message);
      console.log('flags', flags);
      console.log('self', self);
      console.log('extra', extra);
    }

    ComfyJS.onError = (err) => {
      console.error('err', err)
      toast({
        title: 'Twitch Error',
        description: err,
        status: 'error',
        duration: 10000,
        isClosable: true
      })
    }

    // ComfyJS.onChat()

  }, [toast]);

  /**
   * Connects to Twitch Event services only when twitch username and token is set
   */
  const connectTwitchEvents = () => {
    if (twitchUsername && twitchUsername !== '' && token) {
      ComfyJS.Init(twitchUsername, `oauth:${token}`, twitchUsername)
    } else {
      toast({
        title: 'Missing Authentication',
        description: 'Please verify twitch username is entered and twitch has been authenticated in Settings',
        status: 'warning',
        duration: 10000,
        isClosable: true
      })
    }
  }

  const disconnectTwitchEvents = () => {
    ComfyJS.Disconnect();
    setTwitchConnected(false);
    toast({
      title: `Twitch Disconnected`,
      description: 'Twitch Connection has been successfully disconnected.',
      status: 'success',
      duration: 7000,
      isClosable: true
    })
  }
  
  /**
   * Connect OBS Websocket and sets scenes and sources
   */
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

  const getTwitch = () => {
      console.log('token:', token)
  }

  const handleSceneSelection = (scene) => {
    if(!scene) {
      setSceneSelected('')
      setSources([])
    } else {
      setSceneSelected(scene)
      const selectedScene =  scenes.find((s) => s.name === scene)
      console.log('sceneSelected', sceneSelected)
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
                  getTwitch={getTwitch}
                  connectTwitchEvents={connectTwitchEvents}
                  disconnectTwitchEvents={disconnectTwitchEvents}
                  twitchConnected={twitchConnected}
                />
              } />

              <Route path="/Settings" element={
                <Settings
                  twitchUsername={twitchUsername}
                  obsPort={obsPort}
                  obsPassword={obsPassword}
                  setTwitchUsername={setTwitchUsername}
                  setOBSPort={setOBSPort}
                  setOBSPassword={setOBSPassword} 
                  toast={toast}                />
              } />
              <Route path="/auth" element={
                <TwitchAuth 
                  token={token}
                  setToken={setToken}
                />
              } />


              <Route path="/ChannelPoints" element={
              <ChannelPoints 
                  scenes={scenes}
                  sources={sources}
                  obsConnected={obsConnected}
                  handleSceneSelection={handleSceneSelection}
                  handleSourceSelection={handleSourceSelection}
                  
              />
              } />

              <Route path="/Bits" element={
              <Bits 
                  scenes={scenes}
                  sources={sources}
                  obsConnected={obsConnected}
                  handleSceneSelection={handleSceneSelection}
                  handleSourceSelection={handleSourceSelection}
                  
              />
              } />

              <Route path="/Subscriptions" element={
              <Subs 
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
