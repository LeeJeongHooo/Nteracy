import Logo from "../../../assets/images/logo.png";
import HistoryIcon from "../../../assets/icons/history.svg";
import ArrowIcon from "../../../assets/icons/arrow.svg";

interface TopHeaderProps {
  isOpen: boolean;
  onToggleInformation: () => void;
  onToggleHistory: () => void;
}

export const TopHeader = (props: TopHeaderProps) => {
  const { isOpen, onToggleInformation, onToggleHistory } = props;

  return (
    <header className="relative flex justify-between items-center py-3 px-4 bg-mainBlue">
      <img src={Logo} alt="logo" className="w-[100px] h-[35px]" />
      <div className="flex">
        <img
          src={HistoryIcon}
          onClick={onToggleHistory}
          alt="history"
          className="mr-2"
        />
        <img
          src={ArrowIcon}
          onClick={onToggleInformation}
          alt="arrow"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    </header>
  );
};
