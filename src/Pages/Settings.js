import React from "react";
import { Button, Center, Heading, Input, Text, VStack } from "@chakra-ui/react"

const Settings = ({ obsPort, obsPassword, setOBSPort, setOBSPassword }) => {

    return(
        <>
            <form>
                <Center h="50vh">
                    <VStack spacing="2">
                        <Heading>OBS Websocket Settings</Heading>
                        <Center>
                            <Text fontSize="2xl" style={{fontWeight: "bold"}}>Port</Text>
                        </Center>
                        <Input type="text" value={obsPort} onChange={event => setOBSPort(event.target.value)}/>
                        <Center>
                            <Text fontSize="2xl" style={{fontWeight: "bold"}}>Password</Text>
                        </Center>
                        <Input type="text" value={obsPassword} onChange={event => setOBSPassword(event.target.value)}/>
                        <Center>
                            <Button onClick={()=>{console.log(obsPort, obsPassword)}}>Get Port</Button>
                        </Center>
                    </VStack>
                </Center>
            </form>
        </>
        
    )
}

export default Settings;

