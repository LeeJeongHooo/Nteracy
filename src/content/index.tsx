import { createRoot } from "react-dom/client";
import { waitForElement } from "@utils/waitForElement";
import "@assets/styles/main.css";
import App from "./App";

__webpack_public_path__ = chrome.runtime.getURL("");

const appId = "nteracy";
const selector = "#secondary.style-scope.ytd-watch-flexy";

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

  const root = createRoot(appContainer);

  root.render(<App />);
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
