import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import React from "react";

const InputNumber = ({ defaultVal, min, handleValue }) => {

    return (
        <NumberInput
            defaultValue={defaultVal}
            min={min}
            onChange={handleValue}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}

export default InputNumber;