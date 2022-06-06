import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Button, HStack, Box, Flex, Heading, Spacer, Tooltip } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../Components/ColorModeSwitcher"


const Navbar = () => {


    return (
        <>
            <Box shadow='md' w='100%' p={4} bg="#20293a" color='white'>
                <HStack>
                    <Flex w="100%">
                        <Heading pl={20}>OBS Control</Heading>

                        <Spacer></Spacer>
                        <Flex display={['none', 'none', 'flex', 'flex']}>
                        <ButtonGroup gap='.03' variant='ghost' size='sm' mt={2}  _hover={{ color:'black' }}>
                        
                            <Link to='/'>
                                <Button>
                                    Homepage
                                </Button>
                            </Link>
                            <Link to='/ChannelPoints'>
                                <Button>
                                    Channel Points
                                </Button>
                            </Link>
                            <Link to='/Bits'>
                                <Button isDisabled>
                                    Bits
                                </Button>
                            </Link>
                            <Link to='/Subscription'>
                                <Button isDisabled>
                                    Subscriptions
                                </Button>
                            </Link>

                            <Link to='/Settings'>
                                <Button>
                                    Settings
                                </Button>
                            </Link>

                        </ButtonGroup>
                    </Flex>
                        <Tooltip hasArrow label="Toggle Light/Dark Mode">
                            <Box>
                                <ColorModeSwitcher justifySelf="flex-end" />                    
                            </Box>
                        </Tooltip>
                    </Flex>
                </HStack>
            </Box>
        </>
    )
}

export default Navbar