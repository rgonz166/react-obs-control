import React, { useState } from "react";
import { Input, Text } from "@chakra-ui/react"

const Settings = () => {
    const [ username, setUsername ] = useState('')

    return(
        <>
        <form>
            <Text>Twitch User</Text>
            <Input type="text" onChange={event => setUsername(event.target.value)}/>
            {console.log(username)}
        </form>
        </>
        
    )
}

export default Settings;

