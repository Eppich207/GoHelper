function fetchWikiTitle(retries = 3) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            files: ['popup/content.js']
        }, () => {
            chrome.tabs.sendMessage(activeTab.id, {action: "getWikiTitle"}, function(response) {
                if (chrome.runtime.lastError) {
                    if (retries > 0) {
                        setTimeout(() => fetchWikiTitle(retries - 1), 500);
                    } else {
                        console.error('Failed to fetch Wikipedia title after multiple retries.');
                    }
                } else if (response && response.title) {
                    const textEditor = document.getElementById("textEditor");
                    if (textEditor) {
                        textEditor.value = textEditor.value.replace('[WIKI_TITLE]', response.title);
                    }
                }
            });
        });
    });
}

// Grabbing the textbox area and copying it
const MSD = document.getElementById("MSD");
if (MSD) {
    // On click event for MSD
    MSD.onclick = function() {
        const textEditor = document.getElementById("textEditor");
        const text = textEditor.value; 
        // Console.log
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async:Copied text');
        }, function(err) {
            // Error flow
            console.error('Async: Could not copy text: ', err);
        });
    };
}



const StartCountdown1 = document.getElementById("StartCountdown1");
if (StartCountdown1) {
    // On click event for the standard copy
    StartCountdown1.onclick = function() {
        var text = "Buenas dias, mi nombre es Maarten"; // Best regards, Rick
        // Console.log
        navigator.clipboard.writeText(text).then(function() {
           console.log('Async: Copying to clipboard was successful');
        }, function(err) {
            // Error flow
            console.error(err);
        });
    };
}

window.addEventListener('DOMContentLoaded', (event) => {

    const textEditor = document.getElementById("textEditor");

    const MDS = document.getElementById("MDS");
    if (MDS) {
        MDS.addEventListener('click', function() {
            let MSDstr =`
Lorem ipsum dolor sit amet, consectetur 
==========================
          
========================
a

et dolore magna aliqua. Ut enim ad minim 


veniam, quis nostrud exercitation 


 ullamco laboris nisi ut 


========================


aliquip ex ea commodo consequat.
========================
            `;
            textEditor.value = MSDstr;
        });
    }

    const COP = document.getElementById("COP");
    if (COP) {
        COP.addEventListener('click', function() {
            textEditor.value = "Another text";
        });
    }

});

// Grabbing the current version from the manifest
document.addEventListener('DOMContentLoaded', function () {
    // Getting manifest
    let manifest = chrome.runtime.getManifest();
    let version = manifest.version;
    //making sure that you can have text infront of it
    document.getElementById("version").textContent += version;
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {action: "getWikiData"}, function(response) {
        const textEditor = document.getElementById("textEditor");
        if (textEditor) {
            // Replace the title placeholder
            if (response.title) {
                textEditor.value = textEditor.value.replace('[WIKI_TITLE]', response.title);
            }

            // Replace the age placeholder
            if (response.age) {
                textEditor.value = textEditor.value.replace('[Age]', response.age);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    fetchWikiTitle();
    
    
});
