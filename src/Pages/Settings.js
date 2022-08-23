import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Heading, Input, Text, VStack, Divider, Box, Tooltip, InputGroup, InputRightElement, position } from "@chakra-ui/react"
import { ObsContext } from "Contexts/ObsContext";
import { useToast } from "@chakra-ui/toast";
import { TwitchContext } from "Contexts/TwitchContext";
import { TutorialContext } from "Contexts/TutorialContext";
import { Link } from "react-router-dom";
import { Steps } from "intro.js-react";


const Settings = () => {
    const toast = useToast();

    const {
        obsPort, obsPassword,
        setOBSPort, setOBSPassword,
    } = useContext(ObsContext);

    const {
        twitchUsername, setTwitchUsername, clientId
    } = useContext(TwitchContext)

    const { 
        initialStep,
        onSettingsExit, 
        enabledSettings, setEnabledSettings,
        introjsOptions,
        stepsSettings
    } = useContext(TutorialContext)

   
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://rgonz166.github.io'
    const redirectUrl = baseUrl + '/react-obs-control/auth/'
    const scopes = 'channel:manage:redemptions channel:read:redemptions channel:read:hype_train channel:read:subscriptions moderation:read moderation:read user:edit user:read:email chat:edit chat:read';
    const twitchLink = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&force_verify=true&redirect_uri=${redirectUrl}&scope=${scopes}`;
    const [localUsername, setLocalUsername] = useState(twitchUsername);
    const [localPort, setLocalPort] = useState(obsPort);
    const [localPassword, setLocalPassword] = useState(obsPassword);
    const [showPassword, setShowPassword] = useState(false);

    const settingsSaved = () => {

        setTwitchUsername(localUsername);
        setOBSPort(localPort);
        setOBSPassword(localPassword);

        localStorage.setItem('twitchUsername', JSON.stringify(localUsername));
        localStorage.setItem('obsPort', JSON.stringify(localPort));
        localStorage.setItem('obsPassword', JSON.stringify(localPassword));

        toast({
            title: `Settings Saved`,
            description: 'OBS & Twitch Settings Successfully Saved',
            status: 'success',
            duration: 7000,
            isClosable: true
          })

          

    }
    
    
    const navigate = useNavigate();
    const onComplete = () => {
        navigate('/')
    }

    


    
    return(
        <>
            <Steps 
            enabled={enabledSettings}
            steps={stepsSettings}
            options={introjsOptions}
            initialStep={initialStep}
            onExit={onSettingsExit}
            onComplete={onComplete}
            />
            <form>
                <Box paddingTop={3} paddingLeft={3}>
                    <Link to={'https://github.com/obsproject/obs-websocket/releases/download/5.0.1/obs-websocket-4.9.1-compat-Windows-Installer.exe'} target='_blank' download>
                        <Button className="downloadthis"> Download OBS Websocket</Button>
                    </Link>
                </Box>
                <Center>

                <VStack paddingTop={'10vh'} className='settings1' w={"30%"}>
                        <Heading>OBS/Twitch Settings</Heading>
                    <VStack>
                        <Text  fontSize="2xl" style={{fontWeight: "bold"}}>Twitch Username</Text>
                        <Input type='text' value={localUsername} onChange={event => setLocalUsername(event.target.value)} />
                    </VStack>
                    <Center>
                        <VStack spacing="2">
                            <Center>
                                <Text fontSize="2xl" style={{fontWeight: "bold"}}>OBS Port</Text>
                            </Center>
                            <Input type="text" value={localPort} onChange={event => setLocalPort(event.target.value)}/>
                            <Center>
                                <Text fontSize="2xl" style={{fontWeight: "bold"}}>OBS Password</Text>
                            </Center>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={localPassword} onChange={event => setLocalPassword(event.target.value)}/>
                                <InputRightElement width='4.5rem'>
                                    <Button onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </VStack>
                        <Center height='100px' padding={'20px'}>
                            <Divider orientation='vertical' />
                        </Center>
                        <VStack>
                        <Tooltip hasArrow label="Authenticates Twitch and returns token to allow listening to twitch events like Subscriptions, Bits, Follows and others...">
                            <Button bgColor={'#6441a5'} onClick={() => window.location.href = twitchLink}>Twitch Auth</Button>
                        </Tooltip>
                        </VStack>
                    </Center>
                    <Box paddingTop={6}>
                        <Button className="settings2" onClick={()=>{settingsSaved()} }>Save Settings</Button>
                    </Box>

                </VStack>
                </Center>
            </form>
        </>
        
    )
}

export default Settings;

