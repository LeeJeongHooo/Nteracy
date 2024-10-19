import { PropsWithChildren, useCallback, useState } from "react";
import { AccordionContext } from "./context";
import { AccordionHeader } from "./Header";
import { AccordionItem } from "./Item";
import { AccordionContent } from "./Content";
import { AccordionTrigger } from "./Trigger";

export interface AccordionProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export const AccordionRoot = (props: PropsWithChildren<AccordionProps>) => {
  const {
    value: valueProp,
    defaultValue: defaultValueProp,
    onValueChange: onChangeProp,
    ...restProps
  } = props;

  const [uncontrolledvalue, setUncontrolledvalueValue] = useState(
    () => defaultValueProp || []
  );

  const isControlled = valueProp !== undefined;

  const value = isControlled ? valueProp : uncontrolledvalue;

  const handleChangeValue: React.Dispatch<React.SetStateAction<string[]>> =
    useCallback(
      (nextValue) => {
        const value =
          typeof nextValue === "function" ? nextValue(valueProp) : nextValue;
        if (isControlled) {
          if (value !== valueProp) {
            onChangeProp?.(value);
          }
        } else {
          setUncontrolledvalueValue(nextValue);
        }
      },
      [isControlled, valueProp, onChangeProp]
    );

  const handleItemOpen = useCallback(
    (itemValue: string) => {
      handleChangeValue((prev = []) => [...prev, itemValue]);
    },
    [handleChangeValue]
  );

  const handleItemClose = useCallback(
    (itemValue: string) => {
      handleChangeValue((prev) => prev?.filter((value) => value !== itemValue));
    },
    [handleChangeValue]
  );

  return (
    <AccordionContext.Provider
      value={{
        value,
        onItemOpen: handleItemOpen,
        onItemClose: handleItemClose,
      }}
    >
      <div {...restProps} />
    </AccordionContext.Provider>
  );
};

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Content: AccordionContent,
  Trigger: AccordionTrigger,
});
