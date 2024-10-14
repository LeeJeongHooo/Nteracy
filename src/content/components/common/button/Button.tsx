import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const { disabled, children, ...restProps } = props;

  return (
    <button
      ref={ref}
      className="flex items-center justify-center text-[1.4rem] font-normal rounded-[0.8rem] px-3.5 py-2.5 transition-colors bg-mainBlue text-white cursor-pointer disabled:pointer-events-none disabled:bg-gray disabled:text-black "
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
});
