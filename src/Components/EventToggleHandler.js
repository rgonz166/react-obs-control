import { TwitchContext } from "Contexts/TwitchContext";

const { ObsContext } = require("Contexts/ObsContext");
const { useContext, useEffect } = require("react");

const EventToggleHandler = () => {
    const {
        startRecording, stopRecording, obsTwitchMap, handleObsToggling
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
          const currentReward = obsTwitchMap.obsTwitchMap.channelPoints.find(f => f.id === extra.reward.id);
          currentReward.obsToggling.map(toggle => {
            return handleObsToggling(toggle)
          })
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

    }, [ComfyJS, startRecording, stopRecording, handleObsToggling, obsTwitchMap.obsTwitchMap.channelPoints])

    return (null)

}

export default EventToggleHandler;