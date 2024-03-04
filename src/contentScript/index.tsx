import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import ContentScript from "./ContentScript";

let oldHref = "";

window.onload = async () => {
  console.log("window onLoad");
  if (window.location.search !== "" && window.location.search.includes("v=")) {
    await init();
  }

  const bodyList = document.querySelector("body");
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        init();
      }
    });
  });
  observer.observe(bodyList, { childList: true, subtree: true });
};

const init = async () => {
  if (document.querySelector("#digital-literacy")) {
    document.querySelector("#digital-literacy").remove();
  }

  const appContainer = document.createElement("div");
  appContainer.id = "digital-literacy";
  if (!appContainer) {
    throw new Error("새로운 Dom이 생성되지 않았습니다.");
  }

  await waitForElement("#secondary.style-scope.ytd-watch-flexy");
  if (document.querySelector("#digital-literacy")) {
    document.querySelector("#digital-literacy").remove();
  }
  const selectPosition = document.querySelector(
    "#secondary.style-scope.ytd-watch-flexy"
  );

  if (selectPosition) {
    selectPosition.insertAdjacentElement("afterbegin", appContainer);
  }

  const root = createRoot(appContainer);
  root.render(<ContentScript />);
};

export const waitForElement = (selector: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};
