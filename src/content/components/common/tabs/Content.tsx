import { ComponentProps, forwardRef } from "react";
import { useTabsContext } from "./context";

export interface TabsContentProps extends ComponentProps<"div"> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  (props, ref) => {
    const { value: valueProp, ...restProps } = props;
    const { value, baseId } = useTabsContext();

    const isSelected = valueProp === value;
    const triggerId = `${baseId}-trigger`;
    const contentId = `${baseId}-content`;

    return isSelected ? (
      <div
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
