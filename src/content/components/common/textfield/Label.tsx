import { cn } from "@utils/cn";
import { LabelHTMLAttributes, PropsWithChildren } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  title?: string;
  required?: boolean;
}

const Label = (props: PropsWithChildren<LabelProps>) => {
  const { title, required, ...restProps } = props;

  return (
    <label
      className={cn(required && "after:content-['*'] ml-1 text-red100")}
      {...restProps}
    >
      <span>{title}</span>
    </label>
  );
};
