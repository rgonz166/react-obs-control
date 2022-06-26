import React, { useContext, useState } from 'react';
import {  Heading, VStack, Text, Select, Button, Center, HStack } from '@chakra-ui/react';
import { TwitchContext } from 'Contexts/TwitchContext';
import { ObsContext } from 'Contexts/ObsContext';
import ObsOptions from 'Components/ObsOptions';




const ChannelPoints = () => {
    const {obsTwitchMap, setObsTwitchMapAndLocal, handleSaveDisabled, setObsToggleData, getObsTogglingIndex} = useContext(ObsContext)
    const { getPointRewards, twitchRewards, twitchConnected } = useContext(TwitchContext)

    const [selectedReward, setSelectedReward] = useState(null);

    const handleRewardChange = (e) => {
        if (e.target.value === '') {
            setSelectedReward(null)
        }else {
            setSelectedReward(JSON.parse(e.target.selectedOptions[0].dataset.reward))
        }
    }


    const addChannelPoints = () => {
        const currentMap = obsTwitchMap;

        // Check if its the first time being added
        const reward = currentMap.channelPoints.find(f => f.id === selectedReward.id);
        if (!reward) {
            let initialMapItem = {
                id: selectedReward.id,
                name: selectedReward.title,
                cost: selectedReward.cost,
                obsToggling: [setObsToggleData()]
            };

            currentMap.channelPoints.push(initialMapItem)
        } else {
            // If reward id exists, add to things to toggle
            const obsToggleIndex = getObsTogglingIndex(reward.obsToggling);
            if (obsToggleIndex === -1) {
                // If none are found then add to array
                reward.obsToggling.push(setObsToggleData())
            } else {
                // Update the data at the index
                reward.obsToggling[obsToggleIndex] = setObsToggleData();
            }
            
            
        }
        setObsTwitchMapAndLocal(currentMap);
    }

    return (
        <>
            <VStack paddingTop='10vh'>
                <Heading>Channel Points</Heading>
                    <Text fontSize='2xl'>Rewards List:</Text>
                    <Center>

                    <Select placeholder={twitchConnected ? 'Select Reward' : 'Twitch Not Connected'} onChange={handleRewardChange}>
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
                    <Button disabled={handleSaveDisabled() || selectedReward === null} onClick={ () => addChannelPoints()}>Add to List</Button>
                    <Button onClick={ () => getPointRewards()}>Refresh Rewards</Button>
                </HStack>
            </Center>
        </>
    )
}

export default ChannelPoints;