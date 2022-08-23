import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Button, HStack, Box, Flex, Heading, Spacer, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";
import { ObsContext } from "Contexts/ObsContext";
import { TwitchContext } from "Contexts/TwitchContext";


const Navbar = () => {
    
    const {obsConnected, connectObs, disconnectObs} = useContext(ObsContext)
    const {connectTwitchEvents, disconnectTwitchEvents, twitchConnected} = useContext(TwitchContext)

    return (
        <>
            <Box shadow='md' w='100%' p={4} bg="#20293a" color='white'>
                <HStack>
                    <Flex w="100%">
                        <Link to='/'>
                            <Heading pl={21}>OBS Control</Heading>
                        </Link>
                        <Spacer></Spacer>
                        {process.env.NODE_ENV === 'development' &&
                            obsConnected ? 
                            <Button onClick={() => { disconnectObs() }}>Disconnect OBS</Button>
                            :
                            <Tooltip hasArrow label=" Verify all proxy settings are correct and connect to your obs client">
                                <Button onClick={async () => { connectObs() }}>Connect OBS</Button>
                            </Tooltip>
                        }
                        {process.env.NODE_ENV === 'development' &&
                            twitchConnected ? 
                            <Button onClick={() => { disconnectTwitchEvents() }} bgColor={'#6441a5'}>Disconnect Twitch</Button>
                            :
                            <Button onClick={() => { connectTwitchEvents() }} bgColor={'#6441a5'}>Connect Twitch</Button>
                        }

                        <Spacer></Spacer>
                        <Flex display={{ base: "none", md: 'block' }}>
                        <ButtonGroup gap='.03' variant='ghost' size='sm' mt={2} color='white'>
                        
                            <Link to='/'>
                                <Button className="homebutton">
                                    Home
                                </Button>
                            </Link>
                            <Link to='/ChannelPoints'>
                                <Button>
                                    Channel Points
                                </Button>
                            </Link>
                            <Link to='/Bits'>
                                <Button>
                                    Bits
                                </Button>
                            </Link>
                            <Link to='/Subscriptions'>
                                <Button>
                                    Subscriptions
                                </Button>
                            </Link>

                            <Link to='/Settings'>
                                <Button className="beforewebegin">
                                    Settings
                                </Button>
                            </Link>

                        </ButtonGroup>
                    </Flex>
                    <Menu>
                        <MenuButton 
                         display={{ base: "block", md: "none" }}
                         as={IconButton}
                         aria-label='Options'
                         icon={<HamburgerIcon />}
                         variant='outline'

                        />
                        <MenuList p={'5px 13px'}>
                            <Link to='/'>
                                <MenuItem as={Button} margin={'10px 0'}>
                                    Home
                                </MenuItem>
                            </Link>
                            <Link to='/ChannelPoints'>
                                <MenuItem as={Button} margin={'10px 0'} >
                                    ChannelPoints
                                </MenuItem>
                            </Link>
                            <Link to='/Bits'>
                                <MenuItem as={Button} margin={'10px 0'} >
                                    Bits
                                </MenuItem>
                            </Link>
                            <Link to='/Subscriptions'>
                                <MenuItem as={Button} margin={'10px 0'} >
                                    Subscriptions
                                </MenuItem>
                            </Link>
                            <Link to='/Settings'>
                                <MenuItem as={Button} margin={'10px 0'} >
                                    Settings
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                        
                    </Flex>
                </HStack>
            </Box>
        </>
    )
}

export default Navbar