import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { RadioGroupContext, RadioGroupContextValues } from "./context";
import { Radio } from "./Radio";

export interface RadioGroupProps extends ComponentPropsWithoutRef<"div"> {
  name?: RadioGroupContextValues["name"];
  defaultValue?: string;
  required?: RadioGroupContextValues["required"];
  disabled?: RadioGroupContextValues["disabled"];
  value?: RadioGroupContextValues["value"];
  onChangeValue?: RadioGroupContextValues["onChangeValue"];
}

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    const {
      value: valueProp,
      onChangeValue: onChangeValueProp,
      defaultValue,
      disabled = false,
      required = false,
      ...restProps
    } = props;

    const [uncontrolledValue, setUnControlledValue] = useState(
      () => defaultValue || ""
    );

    const isControlled = valueProp !== undefined;

    const value = isControlled ? valueProp : uncontrolledValue;

    const handleChangeValue: React.Dispatch<React.SetStateAction<string>> =
      useCallback(
        (nextValue) => {
          const value =
            typeof nextValue === "function" ? nextValue(valueProp) : nextValue;
          if (isControlled) {
            if (value !== valueProp) {
              onChangeValueProp?.(value);
            }
          } else {
            setUnControlledValue(nextValue);
          }
        },
        [isControlled, valueProp, onChangeValueProp]
      );

    return (
      <RadioGroupContext.Provider
        value={{ value, onChangeValue: handleChangeValue, disabled, required }}
      >
        <div role="radiogroup" ref={ref} {...restProps} />
      </RadioGroupContext.Provider>
    );
  }
);

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: Radio,
});
