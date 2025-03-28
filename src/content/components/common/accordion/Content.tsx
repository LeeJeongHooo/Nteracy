import { forwardRef, ComponentPropsWithoutRef } from "react";
import { useAccordionItemContext } from "./context";
import { cn } from "@utils/cn";

export interface AccordionContentProps
  extends ComponentPropsWithoutRef<"div"> {}

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
      className={cn(
        "overflow-hidden transition-all duration-300",
        open ? "opacity-100 max-h-[1024px]" : "max-h-0 opacity-0"
      )}
      {...props}
    />
  );
});
