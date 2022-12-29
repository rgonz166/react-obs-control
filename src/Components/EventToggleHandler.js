import { TwitchContext } from "Contexts/TwitchContext";

const { ObsContext } = require("Contexts/ObsContext");
const { useContext, useEffect } = require("react");

const EventToggleHandler = () => {
    const {
        startRecording, stopRecording, obsTwitchMap, handleObsToggling, getRangeOfBit
    } = useContext(ObsContext);

    const {
        ComfyJS
    } = useContext(TwitchContext)

    useEffect(() => {

        ComfyJS.onChat = (user, message, flags, self, extra) => {
          console.log('chat data:', JSON.stringify({
            user,
            message,
            flags, 
            self,
            extra
          }))
        }
      
        ComfyJS.onCheer = (user, message, bits, flags, extra) => {
          // console.log('bits data:', JSON.stringify({
          //   user,
          //   message,
          //   bits,
          //   flags, extra
          // }))
          
          const currentReward = getRangeOfBit(bits);
          if (currentReward) {
            if (currentReward) {
              currentReward.obsToggling.map(toggle => {
                return handleObsToggling(toggle, user)
              })
            }
          }

        }
    
        ComfyJS.onGiftSubContinue = (user, sender, extra) => {
          console.log('giftSubContinue data:', JSON.stringify({
            user,
            sender,
            extra
          }))
        }
        
        ComfyJS.onHosted = (user, viewers, autohost, extra) => {
          console.log('hosted data:', JSON.stringify({
            user,
            viewers,
            autohost,
            extra
          }))
        }
    
        ComfyJS.onRaid = (user, viewers) => {
          console.log('raid data:', JSON.stringify({
            user,
            viewers
          }))
        }
    
        ComfyJS.onReward = (user, reward, cost, message, extra) => {
          // console.log('reward data:', JSON.stringify({
          //   user,
          //   reward,
          //   cost,
          //   message,
          //   extra
          // }))
          const currentReward = obsTwitchMap.obsTwitchMap.channelPoints.find(f => f.id === extra.reward.id);
          if (currentReward) {
            currentReward.obsToggling.map(toggle => {
              return handleObsToggling(toggle, user)
            })
          }
        }
    
        ComfyJS.onResub = (user, message, streakMonths, cumulativeMonths, subTierInfo, extra) => {
          console.log('resub data:', JSON.stringify({
            user,
            message,
            streakMonths, 
            cumulativeMonths, 
            subTierInfo,
            extra
          }))
        }
    
        ComfyJS.onSub = (user, message, subTierInfo, extra) => {
          console.log('sub data:', JSON.stringify({
            user,
            message,
            subTierInfo,
            extra
          }))
        }
        
        ComfyJS.onSubMysteryGift = (gifterUser, numbOfSubs, senderCount, subTierInfo, extra) => {
          console.log('chat data:', JSON.stringify({
            gifterUser, 
            numbOfSubs, 
            senderCount, 
            subTierInfo, 
            extra
          }))
        }

    }, [ComfyJS, startRecording, stopRecording, handleObsToggling, obsTwitchMap.obsTwitchMap.channelPoints, getRangeOfBit])

    return (null)

}

export default EventToggleHandler;