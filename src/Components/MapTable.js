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

const MapTable = () => {

    const { obsTwitchMap } = useContext(ObsContext)

    const channelPoints = obsTwitchMap.obsTwitchMap.channelPoints
    

    return (
        <Center>

        <TableContainer width={"60%"} >
            <Table variant={'simple'}>
            <TableCaption>OBS and Twitch Connection</TableCaption>
            <Thead>
                <Tr>
                   <Th>Reward</Th> 
                   <Th>Source</Th> 
                   <Th>Cost</Th> 
                </Tr>
            </Thead>
           <Tbody>
               {channelPoints.map((channelPoint) => {
                return (
                    channelPoint.obsToggling.map((toggle) => {
                        return (
                            <Tr key={channelPoint.id}>
                                <Td>{channelPoint.name}</Td>
                                <Td>{toggle.sourceName}</Td>
                                <Td>{channelPoint.cost}</Td>
                            </Tr>
                        )
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