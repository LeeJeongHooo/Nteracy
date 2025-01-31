import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@utils/cn";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { required, className, ...restProps } = props;

  return (
    <label
      className={cn(
        required && "after:content-['*'] after:ml-1 after:text-red100",
        className
      )}
      {...restProps}
    />
  );
});
