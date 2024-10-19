import { forwardRef, HTMLAttributes, useId } from "react";
import { AccordionItemContext, useAccordionContext } from "./context";

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => {
    const { value: valueProp, ...restProps } = props;
    const valueContext = useAccordionContext();

    const triggerId = useId();
    const open = (valueProp && valueContext.value.includes(valueProp)) || false;

    return (
      <AccordionItemContext.Provider
        value={{ triggerId, open, value: valueProp }}
      >
        <div className="overflow-hidden" ref={ref} {...restProps} />
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = "AccordionItem";
