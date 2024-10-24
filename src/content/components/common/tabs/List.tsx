import { forwardRef, ComponentPropsWithoutRef } from "react";
import { cn } from "@utils/cn";

export interface TabListProps extends ComponentPropsWithoutRef<"div"> {}

export const TabsList = forwardRef<HTMLDivElement, TabListProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn("mt-2 text-base font-medium", className)}
        {...restProps}
      />
    );
  }
);

TabsList.displayName = "TabsList";
