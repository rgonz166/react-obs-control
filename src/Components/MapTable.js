import React, { useContext } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center
  } from '@chakra-ui/react'

  import { ObsContext } from "Contexts/ObsContext";

const MapTable = () => {

    const { obsTwitchMap, tabIndex } = useContext(ObsContext)
    

    const channelPoints = obsTwitchMap.obsTwitchMap.channelPoints
    
    const head = () => {
        switch (tabIndex) {
            case 0:
                return (
                    <Tr>
                        <Th>Reward</Th> 
                        <Th>Scene</Th>
                        <Th>Cost</Th> 
                    </Tr>
                )
            case 1:
                return (
                    <Tr>
                        <Th>Reward</Th> 
                        <Th>Scene</Th>
                        <Th>Source</Th>
                        <Th>Cost</Th> 
                        <Th>Timed</Th> 
                    </Tr>
                )
            case 2: 
            return (
                    <Tr>
                        <Th>Reward</Th> 
                        <Th>Scene</Th>
                        <Th>Source</Th>
                        <Th>Filter</Th>
                        <Th>Cost</Th> 
                        <Th>Timed</Th> 
                    </Tr>
            )
            default:
                break;
                
        }
    }
    
    return (
        <Center marginBottom={'50px'}>

        <TableContainer width={"60%"} >
            <Table variant={'simple'}>
            <TableCaption>OBS and Twitch Toggle List</TableCaption>
            <Thead>
                {head()}
            </Thead>
           <Tbody>
               {channelPoints.map((channelPoint) => {
                return (
                    channelPoint.obsToggling.map((toggle) => {
                       switch (tabIndex) {
                        case 0:
                            if(toggle.sceneName && !toggle.filterName && !toggle.sourceName){
                                // Scene Tab
                                return(
                                    <Tr key={channelPoint.id+toggle.sceneName}>
                                        <Td>{channelPoint.name}</Td>
                                        <Td>{toggle.sceneName}</Td>
                                        <Td>{channelPoint.cost}</Td>
                                    </Tr>
                                )
                            } else {
                                return ('')
                            }
                        case 1: 
                            if(toggle.sourceName && !toggle.filterName) {
                                // Source Tab
                                return (
                                    <Tr key={channelPoint.id+toggle.sourceName}>
                                        <Td>{channelPoint.name}</Td>
                                        <Td>{toggle.sceneName}</Td>
                                        <Td>{toggle.sourceName}</Td>
                                        <Td>{channelPoint.cost}</Td>
                                        <Td>{toggle.timed}</Td>
                                    </Tr>
                                )
                            } else {
                                return ('')
                            }
                        case 2: 
                            if (toggle.filterName) {
                                // Filter Tab
                                return (
                                    <Tr key={channelPoint.id+toggle.filterName}>
                                        <Td>{channelPoint.name}</Td>
                                        <Td>{toggle.sceneName}</Td>
                                        <Td>{toggle.sourceName}</Td>
                                        <Td>{toggle.filterName}</Td>
                                        <Td>{channelPoint.cost}</Td>
                                        <Td>{toggle.timed}</Td>
                                    </Tr>
                                )
                            } else {
                                return ('')
                            }
                       
                        default:
                            return ('');
                       }
                    })
                )
               })}
               
           </Tbody>
          
            </Table>
        </TableContainer>
        </Center>
    )

}

export default MapTable;