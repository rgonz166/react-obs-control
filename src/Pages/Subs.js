import React from "react";
import { Heading, VStack, Text, Input, HStack } from "@chakra-ui/react";
import DropDown from "../Components/DropDowns";

const Subs = ({scenes, sources, obsConnected, handleSceneSelection, handleSourceSelection}) => {
    return(
        <>
        <form>
            <VStack paddingTop='10vh'>
                <Heading>Sub Rewards</Heading>
                    <Text fontSize='2xl'>Set Sub Amounts</Text>
                    <HStack>
                        <VStack>
                            <Text fontSize='2xl'>Max Value</Text>
                            <Input type='text' placeholder='Min Value'></Input>
                        </VStack>
                        <VStack>
                            <Text fontSize='2xl'>Max Value</Text>
                            <Input type='text' placeholder='Min Value'></Input>
                        </VStack>
                    </HStack>
                <DropDown 
                 scenes={scenes}
                 sources={sources}
                 obsConnected={obsConnected}
                 handleSceneSelection={handleSceneSelection}
                 handleSourceSelection={handleSourceSelection}
                />
            </VStack>
        </form>
        </>
    )
}

export default Subs