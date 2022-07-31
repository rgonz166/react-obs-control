import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import React from "react";

const InputNumber = ({ defaultVal, min, handleValue, value }) => {

    return (
        <NumberInput
            defaultValue={defaultVal}
            min={min}
            onChange={handleValue}
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