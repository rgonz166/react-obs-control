import React, { useContext } from 'react';
import {  Heading, VStack, Text, Select, Button,  } from '@chakra-ui/react';
import DropDown from '../Components/DropDowns';
import { ObsContext } from 'Contexts/ObsContext';
import { TwitchContext } from 'Contexts/TwitchContext';




const ChannelPoints = () => {

    const { obsConnected } = useContext(ObsContext)
    const { getPointRewards } = useContext(TwitchContext)

    return (
        <>
        <form>
            <VStack paddingTop='10vh'>
                <Heading>Channel Points</Heading>
                    <Text fontSize='2xl'>Rewards List:</Text>
                    <Select w='20%' placeholder={obsConnected ? 'Select Reward' : 'OBS Not Connected'}>
                        <option>shloompy</option>
                    </Select>
                <DropDown />
                <Button onClick={ () => getPointRewards()}>Refresh Rewards</Button>
            </VStack>
        </form>
        </>
    )
}

export default ChannelPoints;