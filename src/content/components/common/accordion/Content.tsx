import { forwardRef, HTMLAttributes } from "react";
import { useAccordionItemContext } from "./context";

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>((props, ref) => {
  const { triggerId, open } = useAccordionItemContext();

  return (
    <div
      ref={ref}
      role="region"
      aria-labelledby={triggerId}
      {...props}
      className={`${
        open ? "opacity-100 max-h-6" : "max-h-0 opacity-0"
      } transition-all duration-300`}
    />
  );
});
