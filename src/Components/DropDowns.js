import React, { useContext } from "react";
import { VStack, Center, Text, Input, Select, Box,  } from "@chakra-ui/react";
import { ObsContext } from "Contexts/ObsContext";

const DropDown = ({type}) => {
    const {
        scenes, sources, obsConnected, sceneSelected, sourceSelected, 
        handleSceneSelection, handleSourceSelection
    } = useContext(ObsContext)

    return(
        <Center>
                    <VStack paddingRight={5}>

                      
                        <Text fontSize='2xl'>OBS Scenes:</Text>
                        <Select value={sceneSelected} onChange={(e) => handleSceneSelection(e.target.value)} placeholder={obsConnected ? 'Select a Scene' : 'OBS Not Connected'}>
                            {scenes.map((scene) => {
                                return(
                                    <option key={scene.name} value={scene.name}>{scene.name}</option>
                                )
                            })}
                        </Select>
                        {
                            type !== 'scene'
                            && (
                                <Box>
                                    <Text fontSize='2xl'>OBS Sources:</Text>
                                    <Select value={sourceSelected} onChange={(e) => handleSourceSelection(e.target.value)} placeholder={obsConnected ? 'Select a Source' : 'OBS Not Connected'}>
                                        {sources.map((source) => {
                                            return (
                                                <option key={source.name} value={source.name}>{source.name}</option>
                                            )
                                        })}
                                    </Select>
                                </Box>
                            )
                        }

                    </VStack>  

                    {
                        type !== 'scene' 
                        && (
                            <VStack>
                                <Text fontSize='2xl'>Timed?</Text>
                                <Input type='text' placeholder='0'></Input>
                                <Text fontSize='2xl'>Group</Text>
                                <Input placeholder='Text' type='text'></Input>
                            </VStack>
                        )
                    }
                    
                </Center>
    )
}

export default DropDown;