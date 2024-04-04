// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getWikiData") {
        let responseData = {};
        
        // Extracting title
        const titleElement = document.getElementById("firstHeading");
        responseData.title = titleElement ? titleElement.innerText : null;

        // Extracting age
        // Searching for the Naciemiento term and getting the birthElement which contains the age
        const birthThElements = Array.from(document.querySelectorAll("th")).filter(th => th.textContent.trim() === "Nacimiento");
        if (birthThElements.length > 0) {
            // Splits up the birthElements
            const ageTdElement = birthThElements[0].nextElementSibling;
            if (ageTdElement) {
                console.log("Age Element Content:", ageTdElement.textContent);  // Log the entire content
                
                const ageMatch = ageTdElement.textContent.match(/(\d+)\xa0años/);  // \xa0 represents the non-breaking space in JavaScript string

                responseData.age = ageMatch[1]; 
                // Extracting the 2nd element of the extracted ages

            } else {
                // Error flow to console
                console.log("No ageTdElement found.");
            }
        } else {
            // Error flow to console for when no age is found 
            console.log("No birthThElements found.");
        }
        // Sending responseData to the HTML element
        sendResponse(responseData);
    }
    return true;  // indicates the response is sent asynchronously
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserData") {
      let responseData = {};

      // Assuming you can access the shadow DOM root somehow, 
      // here's a pseudo code as you cannot directly access shadow DOM from content scripts.
      const shadowRoot = document.querySelector('custom-element').shadowRoot; // custom-element is a placeholder

      // Now, looking for the element that contains "XXX" which is the user name
      const userNameLink = shadowRoot.querySelector('now-text-link[title="XXX"]');
      if (userNameLink) {
          // Extracting user name. Adjust the selector based on the actual structure.
          // Assuming the user name is directly inside this element or adjust the path to reach the text node.
          const userName = userNameLink.textContent || null;
          responseData.userName = userName;

          console.log("User Name:", userName); // Log the user name
      } else {
          // Error flow to console
          console.log("User name link element not found.");
      }

      // Sending responseData to the HTML element
      sendResponse(responseData);
  }
  return true;  // indicates the response is sent asynchronously
});



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