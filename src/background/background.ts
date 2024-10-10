if (module.hot) {
  require("@cooby/crx-load-script-webpack-plugin/lib/loadScript");
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("BackGround접속");
});

enum AccountStatus {
  SYNC = "SYNC",
  ANY = "ANY",
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "oauth") {
    chrome.identity.getProfileUserInfo(
      { accountStatus: AccountStatus.ANY },
      function (userInfo) {
        sendResponse(userInfo);
      }
    );
    return true;
  }
});
