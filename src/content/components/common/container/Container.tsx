import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mt-2 mx-auto bg-slate-100 rounded overflow-hidden mb-4">
      {children}
    </div>
  );
};

export default Container;
