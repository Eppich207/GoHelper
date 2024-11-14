console.log("Content script loaded!");

const foundText = document.body.innerHTML.includes("AddIn");

console.log("Sending message to background.js");
chrome.runtime.sendMessage({ found: foundText });

console.log("Content script running: sending message");
chrome.runtime.sendMessage({ greeting: "hello" });
