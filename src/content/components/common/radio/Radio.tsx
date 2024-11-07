import { cn } from "@utils/cn";

import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupContext } from "./context";

export interface RadioProps extends ComponentPropsWithoutRef<"input"> {
  value: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    value: valueProp,
    disabled,
    children,
    className,
    ...restProps
  } = props;

  const valueContext = useRadioGroupContext();
  const isDisabled = valueContext.disabled || disabled;
  const checked = valueContext.value === valueProp;

  return (
    <label
      className={cn(
        "inline-flex mr-2 last:mr-0 items-center justify-center text-base font-medium border-[1.6px] border-solid border-primary300 rounded px-3.5 py-[0.85rem] transition-colors duration-300",
        checked && "bg-primary300 text-white ",
        isDisabled && "bg-grey text-black border-0",
        !isDisabled && !checked && "hover:bg-grey100",
        className
      )}
    >
      {children}
      <input
        className="sr-only"
        ref={ref}
        name={valueContext.name}
        type="radio"
        value={valueProp}
        required={valueContext.required}
        disabled={isDisabled}
        checked={checked}
        aria-checked={checked}
        aria-disabled={isDisabled}
        aria-hidden
        onChange={() => {
          if (!checked) valueContext.onChangeValue(valueProp);
        }}
        {...restProps}
      />
    </label>
  );
});

Radio.displayName = "Radio";
