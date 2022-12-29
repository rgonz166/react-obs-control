import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Button, HStack, Box, Flex, Heading, Spacer, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";
import ConnectionButtons from "./ConnectionButtons";


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
                        {
                            process.env.NODE_ENV === 'development' &&
                            <ConnectionButtons />
                        }

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
                                <Tooltip hasArrow label="Page Under Construction" shouldWrapChildren>
                                    <Button disabled={process.env.NODE_ENV !== "development"}>
                                        Subscriptions
                                    </Button>
                                </Tooltip>
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