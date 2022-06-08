import React from "react";
import { VStack, Center, Text, Input, Select,  } from "@chakra-ui/react";

const DropDown = ({scenes, sources, obsConnected, handleSceneSelection, handleSourceSelection}) => {


    return(
        <Center>
                    <VStack paddingRight={5}>

                      
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
                        <Input placeholder='Text' type='text'></Input>
                    </VStack>
                    
                </Center>
    )
}

export default DropDown;