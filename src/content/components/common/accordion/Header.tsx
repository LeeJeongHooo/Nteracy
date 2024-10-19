import { forwardRef, HTMLAttributes } from "react";

export interface AccordionHeaderProps
  extends HTMLAttributes<HTMLHeadingElement> {}

export const AccordionHeader = forwardRef<
  HTMLHeadingElement,
  AccordionHeaderProps
>((props, ref) => {
  return <h3 className="flex" ref={ref} {...props} />;
});

AccordionHeader.displayName = "AccordionHeader";
