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
  } from '@chakra-ui/react'

  import { ObsContext } from "Contexts/ObsContext";

const MapTable = () => {

    const { obsTwitchMap } = useContext(ObsContext)

     

    return (
        <TableContainer>
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
                <Tr></Tr>
            </Tbody>
            </Table>
        </TableContainer>
    )

}

export default MapTable;