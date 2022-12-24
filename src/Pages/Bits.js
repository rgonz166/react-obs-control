import React, { useContext } from 'react';
import { Heading, VStack, Text, HStack, Center, Button } from '@chakra-ui/react';
import ObsOptions from 'Components/ObsOptions';
import InputNumber from 'Components/InputNumber';
import { useState } from 'react';
import { ObsContext } from 'Contexts/ObsContext';
import BitsTable from 'Components/BitsTable';

const Bits = () => {

    const {handleSaveDisabled, addBitsReward} = useContext(ObsContext)

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
                            <Text fontSize='2xl'>Min Value</Text>
                            <InputNumber defaultVal={minBits} min={0} handleValue={setMinBits} value={minBits} />
                        </VStack>
                        <VStack>
                            <Text fontSize='2xl'>Max Value</Text>
                            <InputNumber defaultVal={maxBits} min={minBits} handleValue={setMaxBits} value={maxBits} />
                        </VStack>
                    </HStack>
                    <ObsOptions />
            </VStack>
            <Center>
                <HStack padding={'15px 0'}>
                    <Button disabled={handleSaveDisabled() || (minBits === 0 && maxBits === 0)} onClick={() => addBitsReward(minBits, maxBits)}>Add to List</Button>
                </HStack>
            </Center>

            <BitsTable />
        </form>
        </>
    )
}

export default Bits;