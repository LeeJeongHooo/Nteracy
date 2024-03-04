/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onInstalled.addListener(() => {
    console.log("BackGround접속");
});
chrome.bookmarks.onCreated.addListener(() => { });
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["SYNC"] = "SYNC";
    AccountStatus["ANY"] = "ANY";
})(AccountStatus || (AccountStatus = {}));
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === "oauth") {
        chrome.identity.getProfileUserInfo({ accountStatus: AccountStatus.ANY }, function (userInfo) {
            sendResponse(userInfo);
        });
        return true;
    }
});

/******/ })()
;
//# sourceMappingURL=background.js.map