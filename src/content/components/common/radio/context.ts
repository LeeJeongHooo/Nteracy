import { createContext, useContext } from "react";

export interface RadioGroupContextValues {
  name?: string;
  required: boolean;
  disabled: boolean;
  value: string;
  onChangeValue: (value: string) => void;
}

export const RadioGroupContext = createContext<
  RadioGroupContextValues | undefined
>(undefined);

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error(
      "useRadioGroupContext는 RadioGroup 내부에서만 사용 가능합니다."
    );
  }

  return context;
};
