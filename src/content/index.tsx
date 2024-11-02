import { createRoot } from "react-dom/client";
import App from "./App";
import "@assets/styles/main.css";

__webpack_public_path__ = chrome.runtime.getURL("");

let oldHref = window.location.href;

window.onload = async () => {
  if (window.location.search !== "" && window.location.search.includes("v=")) {
    await init();
  }

  const bodyList = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((_) => {
      if (
        oldHref !== document.location.href &&
        document.location.search.includes("v=")
      ) {
        oldHref = document.location.href;
        init();
      }
    });
  });
  observer.observe(bodyList, { childList: true, subtree: true });
};

const init = async () => {
  const appContainer = document.createElement("div");
  appContainer.id = "digital-literacy";

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
  root.render(<App />);
};

const waitForElement = (selector: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((_) => {
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
