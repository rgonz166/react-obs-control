import React, { useContext } from "react";
import { VStack, Center, Text, Select, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, OrderedList, ListItem, List, Progress, Checkbox,  } from "@chakra-ui/react";
import { ObsContext } from "Contexts/ObsContext";
import InputNumber from "./InputNumber";
import { useEffect } from "react";

const DropDown = ({type}) => {
    const {
        scenes, sources, filters,  obsConnected, sceneSelected, sourceSelected, filterSelected,
        handleSceneSelection, handleSourceSelection, handleFilterSelection, timed, setTimed, 
        isRandomized, setIsRandomized, totalPercent, setTotalPercent, sourceSelectedComplete,
        randomRarity, setRandomRarity,
    } = useContext(ObsContext)

    const marginTest = 20;

    const onChangeInputPercentage = (val, index) => {
        console.log('changeInput', val);
        let temp = {...randomRarity};
        temp['data'][index]['perc'] = val ? val : 0;
        setRandomRarity(temp)
    }

    const onChangeInputTime = (val, index) => {
        let temp = {...randomRarity};
        temp['data'][index]['time'] = val ? val : 0;
        setRandomRarity(temp);
    }

    useEffect(() => {
        let tempTotal = 0;
        const tempValues = randomRarity['data'] ? randomRarity['data'] : {}
        const percentSum = Object.values(tempValues).map(r => r.perc).reduce((prev, curr) => prev + curr, tempTotal)
        setTotalPercent(percentSum)
    }, [randomRarity, setTotalPercent])

    useEffect(() => {
        let temp = {data: {}};
        if (sourceSelectedComplete && sourceSelectedComplete.groupChildren && sourceSelectedComplete.groupChildren.length > 0) {
            sourceSelectedComplete.groupChildren.forEach((child, index) => {
                temp['data'][index] = temp['data'][index] ? temp['data'][index] : {};
                temp['data'][index]['time'] = temp['data'][index] && temp['data'][index]['time'] ? temp['data'][index]['time'] : sourceSelectedComplete.groupChildren[index]['time'];
                temp['data'][index]['perc'] = 0;
                temp['data'][index]['name'] = child.name;
                setRandomRarity(temp);
            })
        } else {
            setRandomRarity({data: {}})
        }
    }, [setRandomRarity, sourceSelectedComplete])
    

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
                                <Select value={sourceSelected} onChange={(e) => handleSourceSelection(e.target.value)} placeholder={obsConnected ? 'Select a Source' : 'OBS Not Connected'}>
                                    {sources.map((source) => {
                                        return (
                                            <option key={source.name} value={source.name}>{source.time ? `${source.name} (${source.time/1000}s)` : source.name}</option>
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
                            {sourceSelectedComplete && sourceSelectedComplete.type === 'group' && (
                                <Checkbox isChecked={isRandomized} onChange={(e) => setIsRandomized(e.target.checked)} >Randomize Group?</Checkbox>
                            )}
                        </VStack>
                    )
                }
                
            </Center>
            {
                (type === 'source' && isRandomized && sourceSelectedComplete && sourceSelectedComplete.groupChildren && sourceSelectedComplete.groupChildren.length > 0)
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
                                        <Th>Timed (ms)</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>{sourceSelectedComplete.name}</Td>
                                        <Td>
                                            <OrderedList>
                                            {
                                                sourceSelectedComplete.groupChildren.map((t, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <ListItem key={index} marginBottom={ marginTest + 'px'}>{t.name}</ListItem>
                                                        )
                                                    } else if (index === sourceSelectedComplete.groupChildren.length -1) {
                                                        return (
                                                            <ListItem key={index} marginTop={ marginTest + 'px'}>{t.name}</ListItem>
                                                        )
                                                    } else {
                                                        return (
                                                            <ListItem key={index} margin={ marginTest + 'px 0'}>{t.name}</ListItem>
                                                        )
                                                    }
                                                })
                                            }
                                            </OrderedList>
                                        </Td>
                                        <Td>
                                            <List>
                                                {
                                                    sourceSelectedComplete.groupChildren.map((t, idx) => {
                                                        return (
                                                            <ListItem key={idx}>
                                                                <InputNumber 
                                                                    defaultVal={0} 
                                                                    min={0} 
                                                                    handleValue={(ds, dn) => onChangeInputPercentage(dn, idx)} 
                                                                    value={randomRarity['data'][idx] && randomRarity['data'][idx]['perc'] ? randomRarity['data'][idx]['perc'] : 0} 
                                                                />
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </Td>
                                        <Td>
                                            <List>
                                                {
                                                    sourceSelectedComplete.groupChildren.map((t, idx) => {
                                                        return (
                                                            <ListItem key={idx}>
                                                                <InputNumber 
                                                                    defaultVal={t && t['time'] ? t['time'] : 0} 
                                                                    min={0} 
                                                                    handleValue={(ds, dn) => onChangeInputTime(dn, idx)} 
                                                                    value={randomRarity['data'][idx] && randomRarity['data'][idx]['time'] ? randomRarity['data'][idx]['time'] : 0} 
                                                                />
                                                            </ListItem>
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