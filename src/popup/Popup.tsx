import ReactDom from "react-dom/client";
import "@assets/styles/main.css";
import Logo from "@assets/images/logo.png";
import LeftArrow from "@assets/icons/left-arrow.svg";

const Popup = () => {
  return (
    <div className="relative top-0 right-0 w-[254px] overflow-hidden bg-primary300 p-2 flex flex-col items-center text-white font-medium">
      <img src={Logo} alt="logo" className="w-[100px] h-[35px]" />
      <p className="mb-2">Youtube에 접속해서 서비스를 이용해보세요</p>
      <button
        className="flex items-center"
        onClick={() => chrome.tabs.create({ url: "https://www.youtube.com/" })}
      >
        <span>Youtube로 이동</span>
        <img className="w-3 h-3" src={LeftArrow} alt="left-arrow" />
      </button>
    </div>
  );
};

const root = ReactDom.createRoot(document.body);
root.render(<Popup />);
