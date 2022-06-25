import React, { useContext } from "react";
import { VStack, Center, Text, Input, Select, Box,  } from "@chakra-ui/react";
import { ObsContext } from "Contexts/ObsContext";

const DropDown = ({type}) => {
    const {
        scenes, sources, filters,  obsConnected, sceneSelected, sourceSelected, filterSelected,
        handleSceneSelection, handleSourceSelection, handleFilterSelection
    } = useContext(ObsContext)

    return(
        <Center>
                    <VStack paddingRight={5}>

                      
                        <Text fontSize='2xl'>OBS Scenes</Text>
                        <Select value={sceneSelected} onChange={(e) => handleSceneSelection(e.target.value)} placeholder={obsConnected ? 'Select a Scene' : 'OBS Not Connected'}>
                            {scenes.map((scene) => {
                                return(
                                    <option key={scene.name} value={scene.name}>{scene.name}</option>
                                )
                            })}
                        </Select>
                        {
                            (type === 'source' || type === 'filter')
                            && (
                                <Box>
                                    <Center>
                                        <Text fontSize='2xl'>OBS Sources</Text>
                                    </Center>
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
                        {
                            type === 'filter'
                            && (
                                <Box>
                                    <Center>
                                        <Text fontSize='2xl'>OBS Filters</Text>
                                    </Center>
                                    {(filters.length === 0 && obsConnected)
                                    ? 
                                    <Center>
                                        <Box>No Filters</Box>
                                    </Center>
                                    : 
                                    <Select value={filterSelected} onChange={(e) => handleFilterSelection(e.target.value)} placeholder={obsConnected ? 'Select a Filter' : 'OBS Not Connected'}>
                                        {filters.map((filter) => {
                                            return (
                                                <option key={filter.name} value={filter.name}>{filter.name}</option>
                                            )
                                        })}
                                    </Select>
                                    }
                                    
                                </Box>
                            )
                        }

                    </VStack>  

                    {
                        type === 'source' 
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