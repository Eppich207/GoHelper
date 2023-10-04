// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getWikiTitle") {
        const titleElement = document.getElementById("firstHeading");
        if (titleElement) {
            sendResponse({ title: titleElement.innerText });
        } else {
            sendResponse({ title: null });
        }
    }
    return true;  // indicates the response is sent asynchronously
});
