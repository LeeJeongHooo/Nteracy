import { PropsWithChildren } from "react";

interface CardProps {
  title: String;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { children, title } = props;

  return (
    <div className="m-3 p-2 bg-white rounded overflow-hidden shadow-[0_3px_8px_rgb(0,0,0,0.2)] nt-left-border">
      <h3 className="text-primary300 text-base font-medium">{title}</h3>
      <div className="flex flex-col mt-2">{children}</div>
    </div>
  );
};
