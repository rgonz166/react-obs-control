import React, { useContext } from "react"
import { Button,Center, VStack, Heading, HStack, Text, Tooltip } from "@chakra-ui/react";
import { ObsContext } from "Contexts/ObsContext";
import { TwitchContext } from "Contexts/TwitchContext";
import md5 from "md5";

const Home = () => {
    const {
        scenes,
        obsConnected, sourceSelectedComplete,
        connectObs, disconnectObs,
        startRecording, stopRecording,
        startStreaming, stopStreaming,
        toggleSource, obsTwitchMap
    } = useContext(ObsContext)

    const { 
        connectTwitchEvents, disconnectTwitchEvents,
        twitchConnected
    } = useContext(TwitchContext);

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
                    {
                        process.env.NODE_ENV === 'development' &&
                            <div>
                                <Button onClick={() => console.log('scenes', scenes)}>Get Scenes</Button>
                                <Button onClick={() => console.log('source', sourceSelectedComplete)}>Get Source</Button>
                                <Button onClick={() => { toggleSource('Text (GDI+)', false) }}>Toggle Source</Button>
                                <Button onClick={() => { startRecording() }}>Start Recording</Button>
                                <Button onClick={() => { stopRecording() }}>Stop Recording</Button>
                                <Button onClick={() => { startStreaming(5000) }}>Start Streaming</Button>
                                <Button onClick={() => { stopStreaming() }}>Stop Streaming</Button>
                                <Button onClick={() => { console.log(obsTwitchMap) }}>Get Map</Button>
                                <Button onClick={() => { console.log(md5(JSON.stringify({min:5, max:6}))) }}>Get MD5</Button>
                            </div>
                    }
                    {twitchConnected ? 
                        <Button onClick={() => { disconnectTwitchEvents() }} bgColor={'#6441a5'}>Disconnect Twitch</Button>
                        :
                        <Button onClick={() => { connectTwitchEvents() }} bgColor={'#6441a5'}>Connect Twitch</Button>
                    }
                </HStack>
            </VStack> 
        </Center>
       </>
    )
}

export default Home;