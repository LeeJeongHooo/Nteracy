import { AccountStatus, BackgroundRequest } from "./const";

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
        files: ["content.js"],
      });
    }
  });
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request === BackgroundRequest.OAUTH) {
    chrome.identity.getProfileUserInfo(
      { accountStatus: AccountStatus.SYNC },
      (userInfo) => {
        sendResponse(userInfo);
      }
    );
    return true;
  }
});
