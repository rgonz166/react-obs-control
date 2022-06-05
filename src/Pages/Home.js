import React from "react"
import { Button,Center, VStack, Heading, HStack, Text } from "@chakra-ui/react";

const Home = ({ obsConnected, connectObs, disconnectObs, getSceneList, getSourcesList}) => {
    

    return (
       <>
        <Center h="50vh">    
            <VStack spacing="3">
                <Heading size="3xl">👋 Hello 👋</Heading> 
                <Text>This app is used to toggle OBS sources using various Twitch services.</Text>
                <Text>Created by: pintarider, rubbertoe64</Text>
                <HStack  spacing="10">
                    {obsConnected ? 
                        <Button onClick={() => { disconnectObs() }}>Disconnect OBS</Button> : 
                        <Button onClick={async () => { connectObs() }}>Connect OBS</Button>
                    }
                    <Button onClick={() => { getSceneList() }}>Get Scenes</Button>
                    <Button onClick={() => { getSourcesList() }}>Get Sources</Button>
                </HStack>
            </VStack> 
        </Center>
   
       </>
    )
}

export default Home;