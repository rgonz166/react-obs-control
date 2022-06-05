import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { ButtonGroup, Button, HStack, Box, Flex, Heading, Spacer } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../Components/ColorModeSwitcher"


const Navbar = () => {


    return (
        <>
             <Box shadow='md' w='100%' p={4} bgGradient='linear(to-r, black.000, blue.500, black.300)' color='white'>
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

                        <Link to='/Settings'>
                            <Button>
                                Settings
                            </Button>
                        </Link>

                </ButtonGroup>
                </Flex>

                <Box>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Box>

             </Flex>
            </HStack>
        </Box>
        </>
    )
}

export default Navbar