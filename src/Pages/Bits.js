import React from 'react';
import {  Heading, VStack, Text, Input, HStack, NumberInput } from '@chakra-ui/react';
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
                            <InputNumber defaultVal={minBits} min={0} handleValue={setMinBits} />
                        </VStack>
                        <VStack>
                            <Text fontSize='2xl'>Max Value</Text>
                            <InputNumber defaultVal={maxBits} min={0} handleValue={setMaxBits} />
                        </VStack>
                    </HStack>
                    <ObsOptions />
            </VStack>
        </form>
        </>
    )
}

export default Bits;