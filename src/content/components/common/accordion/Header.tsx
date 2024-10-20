import { forwardRef, ComponentPropsWithoutRef } from "react";

export interface AccordionHeaderProps extends ComponentPropsWithoutRef<"h3"> {}

export const AccordionHeader = forwardRef<
  HTMLHeadingElement,
  AccordionHeaderProps
>((props, ref) => {
  return <h3 className="flex" ref={ref} {...props} />;
});

AccordionHeader.displayName = "AccordionHeader";
