console.log("Background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in background.js:", request);

  if (request.found) {
    chrome.action.setIcon({ path: "icons/hg16.png" }, () => {
      if (chrome.runtime.lastError) {
        console.error("Failed to set icon:", chrome.runtime.lastError.message);
      }
    });
    console.log("Text found: Icon updated to hg16.png");
  }

  sendResponse({status: "message processed"});
});
