import React, { useEffect, useState, useContext } from "react";
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
import Version from './Components/Version';
import ComfyJS from "comfy.js";
import { ObsContext } from "Contexts/ObsContext";

const App = () => {
  const {
    scenes,
    sources,
    obsConnected,
    handleSceneSelection, handleSourceSelection,
  } = useContext(ObsContext);
  const toast = useToast();
  const [twitchConnected, setTwitchConnected] = useState(false)
  
  const [ twitchUsername, setTwitchUsername] = useState(() => {
    const saved = localStorage.getItem('twitchUsername');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  });
  
  const [ token, setToken ] = useState(() => {
    const saved = localStorage.getItem('twitchToken');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  });
  
  
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

    ComfyJS.onChat = (user, message, flags, self, extra) => {
      console.log('user', user);
      console.log('message', message);
    }

    ComfyJS.onCheer = (user, message, bits, flags, extra) => {
      console.log('user', user);
      console.log('message', message);
      console.log('bits', bits);
    }

    ComfyJS.onGiftSubContinue = (user, sender, extra) => {
      console.log('user', user);
      console.log('sender', sender);
      console.log('extra', extra);
    }
    
    ComfyJS.onHosted = (user, viewers, autohost, extra) => {
      console.log('user', user);
      // number
      console.log('viewers', viewers);
      console.log('autohost?', autohost);
      console.log('extra', extra);
    }

    ComfyJS.onRaid = (user, viewers) => {
      console.log('user', user)
      console.log('viewers', viewers)
    }

    ComfyJS.onReward = (user, reward, cost, message, extra) => {
      console.log('user', user);
      console.log('reward', reward);
      console.log('cost', cost)
      console.log('message', message);
      console.log('extra', extra);
    }

    ComfyJS.onResub = (user, message, streakMonths, cumulativeMonths, subTierInfo, extra) => {
      console.log('user', user);
      console.log('message', message);
      console.log('streakMonths', streakMonths);
      console.log('cumulativeMonths', cumulativeMonths);
      console.log('subTierInfo', subTierInfo);
      console.log('extra', extra);
    }

    ComfyJS.onSub = (user, message, subTierInfo, extra) => {
      console.log('user', user);
      console.log('message', message);
      console.log('subTierInfo', subTierInfo);
      console.log('extra', extra);
    }
    
    ComfyJS.onSubMysteryGift = (gifterUser, numbOfSubs, senderCount, subTierInfo, extra) => {
      console.log('gifterUser', gifterUser);
      console.log('numbOfSubs', numbOfSubs);
      console.log('senderCount', senderCount);
      console.log('subTierInfo', subTierInfo);
      console.log('extra', extra);
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

  const getTwitch = () => {
      console.log('token:', token)
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
                  getTwitch={getTwitch}
                  connectTwitchEvents={connectTwitchEvents}
                  disconnectTwitchEvents={disconnectTwitchEvents}
                  twitchConnected={twitchConnected}
                />
              } />

              <Route path="/Settings" element={
                <Settings
                  twitchUsername={twitchUsername}
                  setTwitchUsername={setTwitchUsername}
                />
              } />

              <Route path="/auth" element={
                <TwitchAuth 
                  token={token}
                  setToken={setToken}
                />
              } />

              <Route path="/ChannelPoints" element={
                <ChannelPoints />
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
