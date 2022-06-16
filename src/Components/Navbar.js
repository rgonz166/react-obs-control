import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Button, HStack, Box, Flex, Heading, Spacer, Tooltip, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";


const Navbar = () => {
    

    return (
        <>
            <Box shadow='md' w='100%' p={4} bg="#20293a" color='white'>
                <HStack>
                    <Flex w="100%">
                        <Link to='/'>
                            <Heading pl={21}>OBS Control</Heading>
                        </Link>

                        <Spacer></Spacer>
                        <Flex display={{ base: "none", md: 'block' }}>
                        <ButtonGroup gap='.03' variant='ghost' size='sm' mt={2} color='white'>
                        
                            <Link to='/'>
                                <Button>
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
                                <Button>
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
                        <MenuList>
                            <Link to='/'>
                                <MenuItem >
                                    <Button w={'100%'}>Home</Button>
                                </MenuItem>
                            </Link>
                            <Link to='/ChannelPoints'>
                                <MenuItem >
                                    <Button w={'100%'}>ChannelPoints</Button>
                                </MenuItem>
                            </Link>
                            <Link to='/Bits'>
                                <MenuItem >
                                    <Button w={'100%'}>Bits</Button>
                                </MenuItem>
                            </Link>
                            <Link to='/Subscriptions'>
                                <MenuItem >
                                    <Button w={'100%'}>Subscriptions</Button>
                                </MenuItem>
                            </Link>
                            <Link to='/Settings'>
                                <MenuItem >
                                    <Button w={'100%'}>Settings</Button>
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