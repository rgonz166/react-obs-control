import { TwitchContext } from "Contexts/TwitchContext";

const { ObsContext } = require("Contexts/ObsContext");
const { useContext, useEffect } = require("react");

const EventToggleHandler = () => {
    const {
        startRecording, stopRecording, changeScene, toggleSource
    } = useContext(ObsContext);

    const {
        ComfyJS
    } = useContext(TwitchContext)

    useEffect(() => {

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
          if (extra.reward.id === '40769920-90c1-499c-800d-1ce508165413') {
            console.log('this specific reward')
          }
          if (extra.reward.id === 'aa8729ca-47b6-4801-97c0-3cfbee9d1553') {
            console.log('start recording')
            startRecording();
          }
          if (extra.reward.id === '284798c8-2051-4af5-a51f-81133dfa1a7c') {
            console.log('stop recording')
            stopRecording();
          }
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

    }, [ComfyJS, startRecording, stopRecording])

    return (null)

}

export default EventToggleHandler;