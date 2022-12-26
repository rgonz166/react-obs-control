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
    Center,
    IconButton,
    Tooltip
  } from '@chakra-ui/react'

  import { ObsContext } from "Contexts/ObsContext";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { TwitchContext } from "Contexts/TwitchContext";
import md5 from "md5";

const MapTable = () => {

    const { obsTwitchMap, tabIndex, obsConnected, handleMapEditClick, handleBitsMapDeleteClick } = useContext(ObsContext);
    const {twitchConnected} = useContext(TwitchContext)


    const noBackgroundColor = 'rgba(255,255,255,0.0)';
    

    const bitsMap = obsTwitchMap.obsTwitchMap.bits
    
    const head = () => {
        switch (tabIndex) {
            case 0:
                return (
                    <Tr>
                        <Th>Min</Th> 
                        <Th>Max</Th> 
                        <Th>Scene</Th>
                    </Tr>
                )
            case 1:
                return (
                    <Tr>
                        <Th>Min</Th> 
                        <Th>Max</Th> 
                        <Th>Scene</Th>
                        <Th>Source</Th>
                        <Th>Timed</Th> 
                        <Th>Random?</Th> 
                        <Th></Th> 
                        <Th></Th> 
                    </Tr>
                )
            case 2: 
            return (
                    <Tr>
                        <Th>Min</Th> 
                        <Th>Max</Th> 
                        <Th>Scene</Th>
                        <Th>Source</Th>
                        <Th>Filter</Th>
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
            <Table variant={'striped'}>
            <TableCaption>OBS and Twitch Toggle List</TableCaption>
            <Thead>
                {head()}
            </Thead>
           <Tbody>
               {bitsMap.map((bits) => {
                return (
                    bits.obsToggling.map((toggle) => {
                       switch (tabIndex) {
                        case 0:
                            if(toggle.sceneName && !toggle.filterName && !toggle.sourceName){
                                // Scene Tab
                                return(
                                    <Tr key={bits + toggle.sceneName}>
                                        <Td>{bits.minBits}</Td>
                                        <Td>{bits.maxBits}</Td>
                                        <Td>{toggle.sceneName}</Td>
                                    </Tr>
                                )
                            } else {
                                return ('')
                            }
                        case 1: 
                            if(toggle.sourceName && !toggle.filterName) {
                                // Source Tab
                                return (
                                    <Tr 
                                        key={bits.id + toggle.sourceName}
                                    >
                                        <Td>{bits.minBits}</Td>
                                        <Td>{bits.maxBits}</Td>
                                        <Td>{toggle.sceneName}</Td>
                                        <Td>{toggle.sourceName}</Td>
                                        <Td>{toggle.timed}</Td>
                                        <Td>{toggle.isRandom ? 'Yes' : 'No'}</Td>
                                        <Td>
                                            <Tooltip hasArrow label='Connect OBS and Twitch to edit selection' isDisabled={obsConnected && twitchConnected} shouldWrapChildren >
                                                <IconButton 
                                                    icon={<EditIcon pointerEvents={'none'} />} 
                                                    backgroundColor={noBackgroundColor} 
                                                    aria-label={"edit button"} 
                                                    onClick={(e) => handleMapEditClick(e)} 
                                                    // TODO: remove disable when edit functionality works again
                                                    disabled={true}
                                                    // disabled={!obsConnected || !twitchConnected}
                                                    data-bitsid={bits.id} 
                                                    data-toggle={JSON.stringify(toggle)}
                                                />
                                            </Tooltip>
                                        </Td>
                                        <Td>
                                            <Tooltip hasArrow label='Connect OBS and Twitch to edit selection' isDisabled={obsConnected && twitchConnected} shouldWrapChildren >
                                                <IconButton 
                                                    icon={<DeleteIcon pointerEvents={'none'} />} 
                                                    backgroundColor={noBackgroundColor} 
                                                    aria-label={"delete button"} 
                                                    onClick={(e) => handleBitsMapDeleteClick(e)}
                                                    disabled={!obsConnected || !twitchConnected}
                                                    data-bitsid={bits.id}
                                                    data-toggle={JSON.stringify(toggle)}
                                                />
                                            </Tooltip>
                                        </Td>
                                    </Tr>
                                )
                            } else {
                                return ('')
                            }
                        case 2: 
                            if (toggle.filterName) {
                                // Filter Tab
                                return (
                                    <Tr key={bits.id + toggle.filterName}>
                                        <Td>{bits.minBits}</Td>
                                        <Td>{bits.maxBits}</Td>
                                        <Td>{toggle.sceneName}</Td>
                                        <Td>{toggle.sourceName}</Td>
                                        <Td>{toggle.filterName}</Td>
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