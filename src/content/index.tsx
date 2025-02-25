import { createRoot } from "react-dom/client";
import { waitForElement } from "@utils/waitForElement";
import styles from "@assets/styles/main.css";
import App from "./App";

__webpack_public_path__ = chrome.runtime.getURL("");

const appId = "nteracy";
const selector = "#secondary.style-scope.ytd-watch-flexy";

const renderApp = (element: Element | DocumentFragment) => {
  const root = createRoot(element);
  root.render(<App />);
};

const init = async () => {
  const appContainer = document.createElement("div");
  appContainer.id = appId;

  const element = await waitForElement(selector);

  const existingAppContainer = document.getElementById(appId);
  if (existingAppContainer) {
    existingAppContainer.remove();
  }

  if (element) {
    element.insertAdjacentElement("afterbegin", appContainer);
  }

  if (process.env.NODE_ENV === "production") {
    const shadowDOM = appContainer.attachShadow({ mode: "open" });
    const styleTag = document.createElement("style");
    styleTag.textContent = `${styles}`;
    shadowDOM.appendChild(styleTag);
    renderApp(shadowDOM);
  } else {
    renderApp(appContainer);
  }

  isInitialize = false;
};

let isInitialize = false;

if (location.pathname === "/watch" && !isInitialize) {
  isInitialize = true;
  init();
}

window.addEventListener("yt-navigate-finish", () => {
  console.log("navigate-finish");
  if (location.pathname === "/watch" && !isInitialize) {
    isInitialize = true;
    init();
  }
});
