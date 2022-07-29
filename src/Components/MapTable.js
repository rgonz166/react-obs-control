import React, { useContext } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center
  } from '@chakra-ui/react'

  import { ObsContext } from "Contexts/ObsContext";
  import { TwitchContext } from "Contexts/TwitchContext";

const MapTable = () => {

    const { obsTwitchMap, tabIndex } = useContext(ObsContext)
    const { twitchRewards } = useContext(TwitchContext)

    const channelPoints = obsTwitchMap.obsTwitchMap.channelPoints
    
    
    return (
        <Center>

        <TableContainer width={"60%"} >
            <Table variant={'simple'}>
            <TableCaption>OBS and Twitch Connection</TableCaption>
            <Thead>
                
            </Thead>
           <Tbody>
               {channelPoints.map((channelPoint) => {
                return (
                    channelPoint.obsToggling.map((toggle) => {
                       switch (tabIndex) {
                        case 0:
                            return (
                                <Tr key={channelPoint.id}>
                                    <Td>{channelPoint.name}</Td>
                                    <Td>{toggle.sceneName}</Td>
                                    <Td>{channelPoint.cost}</Td>
                                </Tr>
                            )
                        case 1: 
                            return (
                                <Tr key={channelPoint.id}>
                                    <Td>{channelPoint.name}</Td>
                                    <Td>{toggle.sceneName}</Td>
                                    <Td>{toggle.sourceName}</Td>
                                    <Td>{channelPoint.cost}</Td>
                                </Tr>
                            )
                       
                        default:
                            break;
                       }
                    })
                )
               })}
               
           </Tbody>
           <Tfoot>
            <Tr>
                <Th>Reward</Th>
                <Th>Source</Th> 
                <Th>Cost</Th> 
            </Tr>
           </Tfoot>
            </Table>
        </TableContainer>
        </Center>
    )

}

export default MapTable;