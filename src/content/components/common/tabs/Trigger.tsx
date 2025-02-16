import { ComponentProps, forwardRef } from "react";
import { useTabsContext } from "./context";
import { cn } from "@utils/cn";

export interface TabsTriggerProps extends ComponentProps<"button"> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (props, ref) => {
    const {
      value: valueProp,
      disabled = false,
      className,
      ...restProps
    } = props;
    const { value, onChangeValue, baseId } = useTabsContext();

    const isSelected = valueProp === value;
    const triggerId = `${baseId}-${valueProp}trigger`;
    const contentId = `${baseId}-${valueProp}content`;

    return (
      <button
        className={cn(
          "px-3 h-8 rounded mr-2 transition-colors duration-300 border-[1px] border-solid border-grey300 bg-white",
          !isSelected && "hover:bg-grey600 hover:text-white",
          isSelected && "bg-primary300 text-white",
          className
        )}
        ref={ref}
        type="button"
        role="tab"
        onClick={() => onChangeValue(valueProp)}
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
