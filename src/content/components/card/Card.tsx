import { PropsWithChildren, ReactNode } from "react";
import { Text } from "../common/txt/Text";
import { cn } from "@utils/cn";

interface CardProps {
  title: string;
  children?: ReactNode;
  className?: string | undefined;
}

export const Card = (props: CardProps) => {
  const { title, className, children } = props;

  return (
    <div
      className={cn(
        "m-3 p-2 bg-white rounded overflow-hidden shadow-[0_3px_8px_rgb(0,0,0,0.2)] nt-left-border",
        className
      )}
    >
      <Text as="h3" className="text-primary300 text-base font-medium">
        {title}
      </Text>
      {children && <div className="flex flex-col mt-2">{children}</div>}
    </div>
  );
};
