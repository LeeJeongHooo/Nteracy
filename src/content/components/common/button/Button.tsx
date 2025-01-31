import { cn } from "@utils/cn";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { disabled, children, className, ...restProps } = props;

    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center text-base font-medium rounded px-3.5 py-2.5 transition-colors bg-primary300 text-white cursor-pointer hover:bg-grey600 disabled:pointer-events-none disabled:bg-grey400 disabled:text-grey500",
          className
        )}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);
