import { PropsWithChildren, useCallback, useState } from "react";
import { AccordionContext } from "./context";
import { AccordionHeader } from "./Header";
import { AccordionItem } from "./Item";
import { AccordionContent } from "./Content";
import { AccordionTrigger } from "./Trigger";

export interface AccordionProps {
  value?: string[];
  defaultValue?: string[];
  onChangeValue?: (value: string[]) => void;
}

export const AccordionRoot = (props: PropsWithChildren<AccordionProps>) => {
  const {
    value: valueProp,
    defaultValue: defaultValueProp,
    onChangeValue: onChangeValueProp,
    ...restProps
  } = props;

  const [uncontrolledValue, setuncontrolledValue] = useState(
    () => defaultValueProp || []
  );

  const isControlled = valueProp !== undefined;

  const value = isControlled ? valueProp : uncontrolledValue;

  const handleChangeValue: React.Dispatch<React.SetStateAction<string[]>> =
    useCallback(
      (nextValue) => {
        const value =
          typeof nextValue === "function"
            ? nextValue(valueProp as string[])
            : nextValue;
        if (isControlled) {
          if (value !== valueProp) {
            onChangeValueProp?.(value);
          }
        } else {
          setuncontrolledValue(nextValue);
        }
      },
      [isControlled, valueProp, onChangeValueProp]
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
