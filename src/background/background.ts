import { AccountStatus, BackgroundRequest } from "./constant";

if (module.hot) {
  require("@cooby/crx-load-script-webpack-plugin/lib/loadScript");
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Background Install");
});

if (process.env.NODE_ENV === "development") {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url?.startsWith("chrome://")) return undefined;

    if (
      changeInfo.status === "complete" &&
      tab.url?.startsWith("https://www.youtube.com")
    ) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"], // DevServer의 최신 번들 경로
      });
    }
  });
}
