import React from "react";
import { Button, Center, Heading, Input, Text, VStack, Divider } from "@chakra-ui/react"

const Settings = ({ obsPort, obsPassword, setOBSPort, setOBSPassword }) => {
    const clientId = '7tpesuf4fwvaihbdotf2ge6khkl75o';
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://rgonz166.github.io'
    const redirectUrl = baseUrl + '/react-obs-control#/auth/'
    const scopes = 'channel:manage:redemptions channel:read:redemptions channel:read:hype_train channel:read:subscriptions moderation:read moderation:read user:edit user:read:email chat:edit chat:read';
    const twitchLink = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&force_verify=true&redirect_uri=${redirectUrl}&scope=${scopes}`;


    return(
        <>
            <form>
                <VStack paddingTop={'10vh'}>
                    <Heading>OBS Websocket Settings</Heading>
                    <Center>
                        <VStack spacing="2">
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
                        <Center height='100px' padding={'20px'}>
                            <Divider orientation='vertical' />
                        </Center>
                        <VStack>
                            <Button bgColor={'#6441a5'} onClick={() => window.location.href = twitchLink}>Authenticate Twtich</Button>
                        </VStack>
                    </Center>
                </VStack>
            </form>
        </>
        
    )
}

export default Settings;

