import { ComponentProps, forwardRef } from "react";
import { useTabsContext } from "./context";
import { cn } from "@utils/cn";

export interface TabsContentProps extends ComponentProps<"div"> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  (props, ref) => {
    const { value: valueProp, className, ...restProps } = props;
    const { value, baseId } = useTabsContext();

    const isSelected = valueProp === value;
    const triggerId = `${baseId}-${valueProp}trigger`;
    const contentId = `${baseId}-${valueProp}content`;

    return isSelected ? (
      <div
        className={cn("mt-3", className)}
        ref={ref}
        id={contentId}
        role="tabpanel"
        aria-labelledby={triggerId}
        tabIndex={0}
        {...restProps}
      />
    ) : null;
  }
);
