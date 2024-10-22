import { ComponentProps, forwardRef } from "react";
import { useTabsContext } from "./context";

export interface TabsTriggerProps extends ComponentProps<"button"> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (props, ref) => {
    const { value: valueProp, disabled = false, ...restProps } = props;
    const { value, onValueChange, baseId } = useTabsContext();

    const isSelected = valueProp === value;
    const triggerId = `${baseId}-trigger`;
    const contentId = `${baseId}-content`;

    return (
      <button
        className={`${isSelected ? "border-red-50" : "border-orange-200"}`}
        ref={ref}
        type="button"
        role="tab"
        onClick={() => onValueChange(valueProp)}
        id={triggerId}
        aria-selected={isSelected}
        aria-controls={contentId}
        disabled={disabled}
        {...restProps}
      />
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";
