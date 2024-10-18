import React from "react";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mt-2 mx-auto bg-slate-100 rounded-2xl overflow-hidden mb-4">
      {children}
    </div>
  );
};

export default Container;
