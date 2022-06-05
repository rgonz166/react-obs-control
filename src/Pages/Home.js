import React from "react"
import { Button,Center, VStack, Heading, HStack, Text, Tooltip } from "@chakra-ui/react";

const Home = ({ obsConnected, connectObs, disconnectObs, getSceneList, getSourcesList, getOBSPort}) => {
    

    return (
       <>
        <Center h="50vh">    
            <VStack spacing="3">
                <Heading size="3xl">👋 Hello 👋</Heading> 
                <Text>This app is used to toggle OBS sources using various Twitch services.</Text>
                <Text>Created by: pintarider, rubbertoe64</Text>
                <HStack  spacing="10">
                    {obsConnected ? 
                        <Button onClick={() => { disconnectObs() }}>Disconnect OBS</Button>:
                        <Tooltip hasArrow label=" Verify all proxy settings are correct and connect to your obs client">
                            <Button onClick={async () => { connectObs() }}>Connect OBS</Button>
                        </Tooltip>
                    }
                    <Button onClick={() => { getSceneList() }}>Get Scenes</Button>
                    <Button onClick={() => { getSourcesList() }}>Get Sources</Button>
                    <Button onClick={() => { getOBSPort() }}>Get Pord</Button>
                </HStack>
            </VStack> 
        </Center>
   
       </>
    )
}

export default Home;