import React, { useContext, useState } from 'react';
import {  Heading, VStack, Text, Select, Button, Center, HStack } from '@chakra-ui/react';
import { TwitchContext } from 'Contexts/TwitchContext';
import { ObsContext } from 'Contexts/ObsContext';
import ObsOptions from 'Components/ObsOptions';




const ChannelPoints = () => {
    const {obsTwitchMap, setObsTwitchMapAndLocal} = useContext(ObsContext)
    const { getPointRewards, twitchRewards, twitchConnected } = useContext(TwitchContext)

    const [selectedReward, setSelectedReward] = useState(null);

    const addChannelPoints = () => {
        console.log('selectedReward', selectedReward);
        const currentMap = obsTwitchMap;
        // Check if its the first time being added
        const rewardIndex = currentMap.channelPoints.indexOf(f => f.id === selectedReward.id);
        if (rewardIndex === -1) {
            currentMap.channelPoints.push({
                id: selectedReward.id,
                name: selectedReward.title,
                cost: selectedReward.cost,
                obsToggling: [
                    {
                        type: 'first time',
                    }
                ]
            })
            console.log('currentMap', currentMap);
            setObsTwitchMapAndLocal(currentMap);
        } else {
            // If reward id exists, add to things to toggle
            // TODO: Check if obsToggling type is already added and depending on type, check specific field are already in array (e.g. sourceName, sceneName...)
            // const obsToggleTypeIndex = currentMap.channelPoints[rewardIndex].obsToggling.indexOf(r => r.type === (selectedTabType) )

            // If none are found then add to array
            currentMap.channelPoints[rewardIndex].obsToggling.push({
                type: 'second time'
            })
            //TODO otherwise update the index with the properties

        }
    }

    return (
        <>
            <VStack paddingTop='10vh'>
                <Heading>Channel Points</Heading>
                    <Text fontSize='2xl'>Rewards List:</Text>
                    <Center>

                    <Select placeholder={twitchConnected ? 'Select Reward' : 'Twitch Not Connected'} onChange={(e) => setSelectedReward(JSON.parse(e.target.selectedOptions[0].dataset.reward))}>
                        {twitchRewards.map((reward) => {
                            return(
                                <option data-reward={JSON.stringify(reward)} key={reward.id} value={reward.id}>{reward.title} ({reward.cost})</option>
                            )
                        })}
                    </Select>
                    </Center>
                <ObsOptions />
            </VStack>
            <Center>
                <HStack paddingTop={'10px'}>
                    {/* TODO Disable button if reward is null or other properties */}
                    <Button onClick={ () => addChannelPoints()}>Add to List</Button>
                    <Button onClick={ () => getPointRewards()}>Refresh Rewards</Button>
                </HStack>
            </Center>
        </>
    )
}

export default ChannelPoints;