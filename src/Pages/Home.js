import React, { useState } from "react"
import { Button,Center, VStack, Heading, HStack } from "@chakra-ui/react";
import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

const Home = () => {
    const [scenes, setScenes] = useState(null)

    const connectObs =  () => {
        obs.connect({address: 'localhost:4444', password: '123456'}).then(() => {
            obs.send('GetSceneList')
            .then( data => {
                console.log('sceneList', data)
            })
        })
        // await obs.connect('ws://localhost:4444', '123456')
    }

    const disconnectObs = () => {
        obs.disconnect();
    }

    const getSceneList = () => {
    }

    return (
       <>
        <Center h="50vh">    
            <VStack spacing="5">
                <Heading size="3xl">👋 Hello 👋</Heading> 
                <HStack  spacing="10">
                    <Button onClick={async () => { connectObs() }}>Connect OBS</Button>
                    <Button onClick={() => { disconnectObs() }}>Disconnect OBS</Button>
                </HStack>
                <Button onClick={() => { getSceneList() }}>Get Scenes</Button>
            </VStack> 
        </Center>
   
       </>
    )
}

export default Home;