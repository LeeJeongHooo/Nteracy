import { forwardRef, ComponentPropsWithoutRef } from "react";
import { useAccordionContext, useAccordionItemContext } from "./context";

export interface AccordionTriggerProps
  extends ComponentPropsWithoutRef<"button"> {}

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>((props, ref) => {
  const { onItemOpen, onItemClose } = useAccordionContext();
  const { open, triggerId, value } = useAccordionItemContext();

  const handleItemToggle = () => {
    if (!open) {
      onItemOpen?.(value);
    } else {
      onItemClose?.(value);
    }
  };
  return (
    <button
      className="flex-1"
      ref={ref}
      id={triggerId}
      aria-expanded={open}
      aria-controls={triggerId}
      onClick={handleItemToggle}
      {...props}
    />
  );
});

AccordionTrigger.displayName = "AccordionTrigger";
