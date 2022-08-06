import React, { useContext, useState } from "react";
import { VStack, Center, Text, Select, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, OrderedList, ListItem, List, Progress, Checkbox,  } from "@chakra-ui/react";
import { ObsContext } from "Contexts/ObsContext";
import InputNumber from "./InputNumber";
import { useEffect } from "react";

const DropDown = ({type}) => {
    const {
        scenes, sources, filters,  obsConnected, sceneSelected, sourceSelected, filterSelected,
        handleSceneSelection, handleSourceSelection, handleFilterSelection, timed, setTimed, 
        isRandomized, setIsRandomized, totalPercent, setTotalPercent
    } = useContext(ObsContext)

    const testArray = ['test', 'test', 'test', 'test'];
    const marginTest = 20;
    
    const [randomRarity, setRandomRarity] = useState({})
    // const [isTotalPercent, setIsTotalPercent] = useState(false)

    const onChangeInput = (val, index) => {
        let temp = {...randomRarity};
        temp[index] = val ? val : 0;
        setRandomRarity(temp);
    }

    useEffect(() => {
        let tempTotal = 0;
        const percentSum = Object.values(randomRarity).reduce((prev, curr) => prev + curr, tempTotal)
        setTotalPercent(percentSum)
    }, [randomRarity])
    

    return(
        <>
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
                                <Select value={sourceSelected} onChange={(e) => handleSourceSelection(e.target)} placeholder={obsConnected ? 'Select a Source' : 'OBS Not Connected'}>
                                    {sources.map((source) => {
                                        return (
                                            <option key={source.name} data-source={JSON.stringify(source)} value={source.name}>{source.time ? `${source.name} (${source.time/1000}s)` : source.name}</option>
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
                    type !== 'scene' 
                    && (
                        <VStack>
                            <Text fontSize='2xl'>Timed?</Text>
                            <InputNumber defaultVal={timed} min={0} handleValue={setTimed} value={timed} />
                            {/* <Input type='number' placeholder='0' defaultValue={0}></Input> */}
                            {/* <Text fontSize='2xl'>Group</Text>
                            <Input placeholder='Text' type='text'></Input> */}
                            <Checkbox isChecked={isRandomized} onChange={(e) => setIsRandomized(e.target.checked)} >Randomize Group?</Checkbox>
                        </VStack>
                    )
                }
                
            </Center>
            {
                (type === 'source' && isRandomized)
                && (
                    <Box outline={'1px solid rgba(255,255,255,0.2)'} marginTop={'20px'}>
                        {/* <Divider margin={'20px 0'} /> */}
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Folder</Th>
                                        <Th>Sources</Th>
                                        <Th>Percentages</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Test Folder</Td>
                                        <Td>
                                            <OrderedList>
                                            {
                                                testArray.map((t, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <ListItem key={index} marginBottom={ marginTest + 'px'}>{t}</ListItem>
                                                        )
                                                    } else if (index === testArray.length -1) {
                                                        return (
                                                            <ListItem key={index} marginTop={ marginTest + 'px'}>{t}</ListItem>
                                                        )
                                                    } else {
                                                        return (
                                                            <ListItem key={index} margin={ marginTest + 'px 0'}>{t}</ListItem>
                                                        )
                                                    }
                                                })
                                            }
                                            </OrderedList>
                                        </Td>
                                        <Td>
                                            <List>
                                                {
                                                    testArray.map((t, idx) => {
                                                        return (
                                                            <ListItem key={idx}><InputNumber defaultVal={randomRarity[idx] ? randomRarity[idx] : 0} min={0} handleValue={(ds, dn) => onChangeInput(dn, idx)} value={randomRarity[idx] ? randomRarity[idx] : 0} /></ListItem>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <VStack padding={'10px 0'}>
                            <Text>Total Percentage</Text>
                            <Progress w={'95%'} colorScheme={totalPercent === 100 ? 'green' : totalPercent > 100 ? 'red' : 'blue'} value={totalPercent} />
                            <Text color={totalPercent > 100 ? 'red' : ''}>{totalPercent}</Text>
                        </VStack>
                    </Box>
                )
            }
            
        </>
    )
}

export default DropDown;