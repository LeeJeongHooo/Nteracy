import { createRoot } from "react-dom/client";
import { waitForElement } from "@utils/waitForElement";
import "@assets/styles/main.css";
import App from "./App";
import { setUpDomObserver } from "@utils/domObserver";

__webpack_public_path__ = chrome.runtime.getURL("");

let oldHref = window.location.href;
window.onload = async () => {
  if (window.location.search !== "" && window.location.search.includes("v=")) {
    await init();
  }
  setUpDomObserver(() => {
    if (
      oldHref !== document.location.href &&
      document.location.search.includes("v=")
    ) {
      oldHref = document.location.href;
      init();
    }
  }, "body");
};

const init = async () => {
  const appContainer = document.createElement("div");
  appContainer.id = "digital-literacy";

  await waitForElement("#secondary.style-scope.ytd-watch-flexy");

  const existingAppContainer = document.querySelector("#digital-literacy");
  if (existingAppContainer) {
    existingAppContainer.remove();
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
