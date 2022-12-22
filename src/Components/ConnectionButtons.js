import React, { useContext } from "react"
import { Button, Tooltip } from "@chakra-ui/react"
import { ObsContext } from "Contexts/ObsContext"
import { TwitchContext } from "Contexts/TwitchContext"



const ConnectionButtons = () => {

    const {obsConnected, connectObs, disconnectObs} = useContext(ObsContext)
    const {connectTwitchEvents, disconnectTwitchEvents, twitchConnected} = useContext(TwitchContext)

    return (
    <>
    {
        obsConnected ? 
        <Button onClick={() => { disconnectObs() }}>Disconnect OBS</Button>
        :
        <Tooltip hasArrow label=" Verify all proxy settings are correct and connect to your obs client">
            <Button onClick={async () => { connectObs() }}>Connect OBS</Button>
        </Tooltip>
    }
    {
        twitchConnected ? 
        <Button onClick={() => { disconnectTwitchEvents() }} bgColor={'#6441a5'}>Disconnect Twitch</Button>
        :
        <Button onClick={() => { connectTwitchEvents() }} bgColor={'#6441a5'}>Connect Twitch</Button>
    
    }
    </>
    )
}

export default ConnectionButtons