import Logo from "@assets/images/logo.png";
import ArrowIcon from "@assets/icons/arrow.svg";
import { useAccordionItemContext } from "../common/accordion/context";

export const Header = () => {
  const { open } = useAccordionItemContext();

  return (
    <p className="relative flex justify-between items-center py-3 px-4 bg-primary300">
      <img src={Logo} alt="logo" className="w-[100px] h-[35px]" />
      <span>
        <img
          src={ArrowIcon}
          alt="arrow"
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </span>
    </p>
  );
};
