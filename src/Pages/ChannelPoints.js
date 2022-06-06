import React from 'react';
import {  Heading, VStack, Text, Select,  } from '@chakra-ui/react';
import DropDown from '../Components/DropDowns';



const ChannelPoints = ({scenes, sources, obsConnected, handleSceneSelection, handleSourceSelection}) => {


    return (
        <>
        <form>
            <VStack paddingTop='10vh'>
                <Heading>Channel Points</Heading>
                    <Text fontSize='2xl'>Rewards List:</Text>
                    <Select w='20%' placeholder={obsConnected ? 'Select Reward' : 'OBS Not Connected'}>
                        <option>shloompy</option>
                    </Select>
                <DropDown 
                 scenes={scenes}
                 sources={sources}
                 obsConnected={obsConnected}
                 handleSceneSelection={handleSceneSelection}
                 handleSourceSelection={handleSourceSelection}
                />
            </VStack>
        </form>
        </>
    )
}

export default ChannelPoints;