console.log("Background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  

  if (request.found) {
    chrome.action.setIcon({ path: "icons/hg16.png" }, () => {
      if (chrome.runtime.lastError) {
        console.error("Failed to set icon:", chrome.runtime.lastError.message);
      }
    });
    
  }

  sendResponse({status: "message processed"});
});
