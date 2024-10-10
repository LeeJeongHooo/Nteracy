import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={`flex-1 rounded-lg px-10 py-2 flex gap-1 items-center justify-center ${
        disabled
          ? "bg-gray text-black cursor-not-allowed"
          : disabled === undefined
          ? ""
          : "bg-mainBlue text-white"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
