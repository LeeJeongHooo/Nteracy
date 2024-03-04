import React from "react";
import ReactDom from "react-dom/client";
import "../assets/tailwind.css";

import PopupContainer from "./components/common/PopupContainer";

const Popup = (
  <PopupContainer>
    <div className="rounded-lg overflow-hidden shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
      <h3 className="bg-darkBlue text-white p-2">
        <span>카테고리</span>
      </h3>
      <div className="flex flex-col gap-2 p-2">
        <p>카테고리: 뉴스/정치</p>
        <p>게시자: BBC News</p>
        <p>게시일: 2023.08.11 금요일</p>
      </div>
    </div>
  </PopupContainer>
);

const container = document.createElement("div");
document.body.appendChild(container);

const root = ReactDom.createRoot(container);
root.render(Popup);
