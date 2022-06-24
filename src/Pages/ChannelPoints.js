import React, { useContext } from 'react';
import {  Heading, VStack, Text, Select, Button, Center,  } from '@chakra-ui/react';
import DropDown from '../Components/DropDowns';
import { TwitchContext } from 'Contexts/TwitchContext';




const ChannelPoints = () => {

    const { getPointRewards, twitchRewards, twitchConnected } = useContext(TwitchContext)

    return (
        <>
        <form>
            <VStack paddingTop='10vh'>
                <Heading>Channel Points</Heading>
                    <Text fontSize='2xl'>Rewards List:</Text>
                    <Center>

                    <Select placeholder={twitchConnected ? 'Select Reward' : 'Twitch Not Connected'}>
                        {twitchRewards.map((reward) => {
                            return(
                                <option key={reward.id} value={reward.id}>{reward.title} ({reward.cost})</option>
                            )
                        })}
                    </Select>
                    </Center>
                <DropDown />
                <Button onClick={ () => getPointRewards()}>Refresh Rewards</Button>
            </VStack>
        </form>
        </>
    )
}

export default ChannelPoints;