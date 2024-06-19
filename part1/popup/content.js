// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "copyTextToClipboard") {
        navigator.clipboard.writeText(request.text).then(function() {
          console.log('Async:Copied text');
          sendResponse({success: true});
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
          sendResponse({success: false, error: err});
        });
        return true; // Indicates you wish to send a response asynchronously
      }
    }
  );