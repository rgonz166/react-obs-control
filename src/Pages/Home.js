import React, { useState } from "react"
import { Button, Flex } from "@chakra-ui/react"
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
        <Flex>
            <h1>Hello World</h1> 
            <Button onClick={async () => { connectObs() }}>connect</Button>
            <Button onClick={() => { disconnectObs() }}>disconnect</Button>
            <Button onClick={() => { getSceneList() }}>get scenes</Button>
        </Flex>
    )
}

export default Home;