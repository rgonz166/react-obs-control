import React, { useEffect, useState } from "react";
import { useToast } from '@chakra-ui/toast';
import ComfyJS from "comfy.js";


export const TwitchContext = React.createContext(null);

export function TwitchProvider ({children}) {
    const toast = useToast();
    const clientId = '7tpesuf4fwvaihbdotf2ge6khkl75o';

    // Add useEffect below
    useEffect(() => {
        ComfyJS.onConnected = () => {
          getPointRewards();
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

    // Add states below
    const [twitchConnected, setTwitchConnected] = useState(false)
  
    const [ twitchUsername, setTwitchUsername] = useState(() => {
      const saved = localStorage.getItem('twitchUsername');
      const initialValue = JSON.parse(saved);
      return initialValue || '';
    });

    const [ twitchRewards, setTwitchRewards ] = useState([])
    
    const [ token, setToken ] = useState(() => {
      const saved = localStorage.getItem('twitchToken');
      const initialValue = JSON.parse(saved);
      return initialValue || '';
    });

    // Add Functions below
    /**
     * Connects to Twitch Event services only when twitch username and token is set
     */
    const connectTwitchEvents = () => {
        if (twitchUsername && twitchUsername !== '' && token) {
        ComfyJS.Init(twitchUsername, token, twitchUsername)
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

    const getPointRewards = async() => {
      const rewards = await ComfyJS.GetChannelRewards( clientId, false );
      const sortedRewards = rewards.sort((a, b) => a.cost > b.cost ? 1 : -1)
      setTwitchRewards(sortedRewards)
      console.log(sortedRewards)
    }



    return (
        <TwitchContext.Provider
            // variables and function that will be used globally
            value={
                {
                    twitchConnected, setTwitchConnected,
                    twitchUsername, setTwitchUsername,
                    token, setToken,
                    connectTwitchEvents, disconnectTwitchEvents,
                    getTwitch, clientId,
                    getPointRewards, twitchRewards,
                    setTwitchRewards
                }
            }
        >
            {children}
        </TwitchContext.Provider>
    )
}