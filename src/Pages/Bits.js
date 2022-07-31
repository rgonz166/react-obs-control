import React from 'react';
import { Heading, VStack, Text, HStack } from '@chakra-ui/react';
import ObsOptions from 'Components/ObsOptions';
import InputNumber from 'Components/InputNumber';
import { useState } from 'react';

const Bits = () => {

    const [minBits, setMinBits] = useState(0);
    const [maxBits, setMaxBits] = useState(0);

    return (
        <>
        <form>
            <VStack paddingTop='10vh'>
                <Heading>Bit Rewards</Heading>
                    <Text fontSize='2xl'>Set Bit Amounts</Text>
                    <HStack>
                        <VStack>
                            <Text fontSize='2xl'>Max Value</Text>
                            <InputNumber defaultVal={minBits} min={0} handleValue={setMinBits} value={minBits} />
                        </VStack>
                        <VStack>
                            <Text fontSize='2xl'>Max Value</Text>
                            <InputNumber defaultVal={maxBits} min={0} handleValue={setMaxBits} value={maxBits} />
                        </VStack>
                    </HStack>
                    <ObsOptions />
            </VStack>
        </form>
        </>
    )
}

export default Bits;