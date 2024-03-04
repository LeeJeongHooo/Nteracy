import React from "react";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const PopupContainer = ({ children }: ContainerProps) => {
  return (
    <div className="w-96 p-6 mx-auto h-[600px] bg-slate-100">{children}</div>
  );
};

export default PopupContainer;
