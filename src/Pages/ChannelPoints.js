import React from 'react';
import { Center, Heading, VStack, Text, HStack, Menu, MenuButton, MenuList, MenuItem, Button, Input, Grid, GridItem, Select } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';



const ChannelPoints = ({scenes, sources, obsConnected, handleSceneSelection, handleSourceSelection}) => {


    return (
        <>
        <form>
            <VStack paddingTop='10vh'>
                <Heading>Channel Points</Heading>
                <Center>
                    <VStack>

                        <Text fontSize='2xl'>Rewards List:</Text>
                        <Select placeholder={obsConnected ? 'Select Reward' : 'OBS Not Connected'}>
                            <option>shloompy</option>
                        </Select>
                      
                        <Text fontSize='2xl'>OBS Scenes:</Text>
                        <Select onChange={(e) => handleSceneSelection(e.target.value)} placeholder={obsConnected ? 'Select a Scene' : 'OBS Not Connected'}>
                            {scenes.map((scene) => {
                                return(
                                    <option key={scene.name} value={scene.name}>{scene.name}</option>
                                )
                            })}
                        </Select>

                        <Text fontSize='2xl'>OBS Sources:</Text>
                        <Select onChange={(e) => handleSourceSelection(e.target.value)} placeholder={obsConnected ? 'Select a Source' : 'OBS Not Connected'}>
                            {sources.map((source) => {
                                return (
                                    <option key={source.name} value={source.name}>{source.name}</option>
                                )
                            })}
                        </Select>
                    </VStack>  


                    <VStack>
                        <Text fontSize='2xl'>Timed?</Text>
                        <Input type='text' placeholder='0'></Input>
                        <Text fontSize='2xl'>Group</Text>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<FaChevronDown/>}>None</MenuButton>
                        </Menu>
                    </VStack>
                    
                </Center>
            </VStack>
        </form>
        </>
    )
}

export default ChannelPoints;