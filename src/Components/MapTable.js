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


    return (
        <Center>

        <TableContainer width={"40%"}>
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
                {obsTwitchMap.obsTwitchMap.channelPoints.map(channelPoint => {
                    return (
                        <Tr key={channelPoint.id}>
                            <Td>{channelPoint.name}</Td>
                        </Tr>
                    )
                })}
           </Tbody>
            </Table>
        </TableContainer>
        </Center>
    )

}

export default MapTable;