import { ComponentPropsWithoutRef, forwardRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { disabled, children, ...restProps } = props;

    return (
      <button
        ref={ref}
        className="flex items-center justify-center text-base font-medium rounded px-3.5 py-2.5 transition-colors bg-primary300 text-white cursor-pointer hover:bg-grey100 disabled:pointer-events-none disabled:bg-grey disabled:text-black"
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);
