import { ComponentPropsWithoutRef, ElementType } from "react";

type TextProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Text = <T extends ElementType = "span">(props: TextProps<T>) => {
  const { as, ...restProps } = props;

  const Component = as || "span";

  return <Component {...restProps} />;
};
