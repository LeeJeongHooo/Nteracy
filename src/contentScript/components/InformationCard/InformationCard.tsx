import React, { ReactNode } from "react";

interface InformationCardProps {
  children?: ReactNode;
  title: String;
}

const InformationCard = ({ children, title }: InformationCardProps) => {
  return (
    <div className="m-4 rounded-lg overflow-hidden shadow-[0_3px_8px_rgb(0,0,0,0.2)] digital-literacy-left-border">
      <h3 className="text-mainBlue p-2 text-lg font-[500]">{title}</h3>
      <div className="flex flex-col gap-2 p-2">{children}</div>
    </div>
  );
};

export default InformationCard;
