import { cn } from "@utils/cn";
import { InputHTMLAttributes, ChangeEvent, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = "text",
    maxLength,
    onChange,
    error,
    className,
    ...restProps
  } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
      return;
    }

    if (onChange) onChange(event);
  };

  return (
    <input
      ref={ref}
      type={type}
      maxLength={maxLength}
      onChange={handleChange}
      className={cn(
        "block w-full bg-grey100 rounded border-[1px] border-solid border-grey300 px-3 py-2 outline-none",
        error && "border-red100",
        className
      )}
      {...restProps}
    />
  );
});

Input.displayName = "Input";
