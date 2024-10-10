import React from "react";
import { GiBackwardTime } from "react-icons/gi";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
interface HeaderProps {
  onClick?: () => void;
  isOpen: boolean;
  openHistory?: (isopen: boolean) => void;
  isOpenHistory: boolean;
}

const Header = ({
  onClick,
  isOpen,
  openHistory,
  isOpenHistory,
}: HeaderProps) => {
  return (
    <header className="flex gap-4 py-4 px-5 bg-mainBlue relative">
      {isOpen && isOpenHistory && (
        <AiOutlineLeft
          className="text-white absolute top-3 left-3"
          size={24}
          onClick={() => openHistory(false)}
        />
      )}
      <h2 className="text-2xl ml-10 text-white font-[600]">NEWTERACY</h2>
      <div className="absolute top-3 right-3 text-white flex gap-5">
        <GiBackwardTime size={24} onClick={() => openHistory(true)} />
        {isOpen ? (
          <AiOutlineUp size={24} onClick={onClick} />
        ) : (
          <AiOutlineDown size={24} onClick={onClick} />
        )}
      </div>
    </header>
  );
};

export default Header;
