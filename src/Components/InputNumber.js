import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import React from "react";

const InputNumber = ({ defaultVal, min, handleValue, value }) => {

    return (
        <NumberInput
            defaultValue={defaultVal}
            min={min}
            onChange={(strVal, numVal) => handleValue(numVal)}
            value={value}
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