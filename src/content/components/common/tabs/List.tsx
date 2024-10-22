import { forwardRef, ComponentPropsWithoutRef } from "react";

export interface TabListProps extends ComponentPropsWithoutRef<"div"> {}

export const TabsList = forwardRef<HTMLDivElement, TabListProps>(
  (props, ref) => {
    return <div ref={ref} role="tablist" {...props} />;
  }
);

TabsList.displayName = "TabsList";
