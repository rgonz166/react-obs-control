import React, { useContext, useState } from 'react';
import {  Heading, VStack, Text, Select, Button, Center, HStack } from '@chakra-ui/react';
import { TwitchContext } from 'Contexts/TwitchContext';
import { ObsContext } from 'Contexts/ObsContext';
import ObsOptions from 'Components/ObsOptions';
import MapTable from 'Components/MapTable';




const ChannelPoints = () => {
    const {handleSaveDisabled, addChannelPoints} = useContext(ObsContext)
    const { getPointRewards, twitchRewards, twitchConnected } = useContext(TwitchContext)

    const [selectedReward, setSelectedReward] = useState('');

    const handleRewardChange = (e) => {
        console.log(e.target.value)
        if (!e.target.value) {
            setSelectedReward('')
        }else {
            setSelectedReward(e.target.value)
        }
    }


   

    return (
        <>
            <VStack paddingTop='10vh'>
                <Heading>Channel Points</Heading>
                    <Text fontSize='2xl'>Rewards List:</Text>
                    <Center>

                    <Select value={selectedReward} placeholder={twitchConnected ? 'Select Reward' : 'Twitch Not Connected'} onChange={handleRewardChange}>
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
                <HStack padding={'15px 0'}>
                    <Button disabled={handleSaveDisabled() || selectedReward === null} onClick={() => addChannelPoints(selectedReward)}>Add to List</Button>
                    <Button onClick={ () => getPointRewards()}>Refresh Rewards</Button>
                </HStack>
            </Center>

            <MapTable />
        </>
    )
}

export default ChannelPoints;