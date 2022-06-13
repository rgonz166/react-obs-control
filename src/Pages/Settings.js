import React from "react";
import { Button, Center, Heading, Input, Text, VStack, Divider, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom";

const Settings = ({ obsPort, obsPassword, setOBSPort, setOBSPassword, toast }) => {
    const clientId = '7tpesuf4fwvaihbdotf2ge6khkl75o';
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://rgonz166.github.io'
    const redirectUrl = baseUrl + '/react-obs-control#/auth/'
    const scopes = 'channel:manage:redemptions channel:read:redemptions channel:read:hype_train channel:read:subscriptions moderation:read moderation:read user:edit user:read:email chat:edit chat:read';
    const twitchLink = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&force_verify=true&redirect_uri=${redirectUrl}&scope=${scopes}`;

    const settingsSaved = () => {
        toast({
            title: `Settings Saved`,
            description: 'OBS & Twitch Settings Successfully Saved',
            status: 'success',
            duration: 7000,
            isClosable: true
          })
    }

    return(
        <>
            <form>
                <VStack paddingTop={'10vh'}>
                        <Heading>OBS/Twitch Settings</Heading>
                    <VStack>
                        <Text  fontSize="2xl" style={{fontWeight: "bold"}}>Twitch Username</Text>
                        <Input type='text' ></Input>
                    </VStack>
                    <Center>
                        <VStack spacing="2">
                            <Center>
                                <Text fontSize="2xl" style={{fontWeight: "bold"}}>OBS Port</Text>
                            </Center>
                            <Input type="text" value={obsPort} onChange={event => setOBSPort(event.target.value)}/>
                            <Center>
                                <Text fontSize="2xl" style={{fontWeight: "bold"}}>OBS Password</Text>
                            </Center>
                            <Input type="text" value={obsPassword} onChange={event => setOBSPassword(event.target.value)}/>
                        </VStack>
                        <Center height='100px' padding={'20px'}>
                            <Divider orientation='vertical' />
                        </Center>
                        <VStack>
                            <Button bgColor={'#6441a5'} onClick={() => window.location.href = twitchLink}>Twitch Auth</Button>
                        </VStack>
                    </Center>
                    <Box paddingTop={6}>
                        <Link to='/'> 
                            <Button onClick={()=>{settingsSaved()} }>Save Settings</Button>
                        </Link>
                    </Box>

                </VStack>
            </form>
        </>
        
    )
}

export default Settings;

