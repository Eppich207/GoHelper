

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

function SimpleCopy() {
        console.log('Async:1');
        const textEditor = document.getElementById("textEditor");
        const text = textEditor.value; 
        // Console.log
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async:Copied text');
        }, function(err) {
            // Error flow
            console.error('Async: Could not copy text: ', err);
        });
    }


window.addEventListener('DOMContentLoaded', (event) => {

    const textEditor = document.getElementById("textEditor");

    // Opening Button
    if (MDS) {
        MDS.addEventListener('click', function() {
            let MSDstr ="Hi , ik ben Maarten van EY technology, ik zie een open ticket over . Hoe is de stand van zaken?";
            textEditor.value = MSDstr;
        });
        MDS.addEventListener('dblclick', SimpleCopy) 
    }

    // AD fup notice Button
    const COP = document.getElementById("COP");
    if (COP) {
        COP.addEventListener('click', function() {
            textEditor.value = "We tried to reach out, without any luck. We will be trying again next business day.";
        });
        COP.addEventListener('dblclick', SimpleCopy) 
    }

    // Closing Button
    const CCL = document.getElementById("CCL");
    if (CCL) {
        CCL.addEventListener('click', function() {
            textEditor.value = "Mocht je nog wat tijd over hebben, kan je dan feedback geven in de mail de nu je kant op komt? En een hele fijne dag nog!";
        });
        CCL.addEventListener('dblclick', SimpleCopy) 
    }

    // Away message Button
    const AWY = document.getElementById("AWY");
    if (AWY) {
        AWY.addEventListener('click', function() {
            textEditor.value = "Ik zie ook dat je momenteel niet beschikbaar bent. Wanneer heb je tijd om hier naar te kijken? Als ik geen antwoord ontvang kom ik later vandaag bij je terug";
        });
        AWY.addEventListener('dblclick', SimpleCopy) 
    }

    // Follow up date Button

    if (FUP) {
        FUP.addEventListener('click', function() {
            const dateObj = new Date;
            textEditor.value = "FUP 1 " + dateObj.toDateString();
        });
        FUP.addEventListener('dblclick', SimpleCopy) 
    }


    // Copy button
    // Grabbing the textbox area and copying it
    const CPB = document.getElementById("CPB");
    if (CPB) {
        CPB.onclick = SimpleCopy;};



    const TIT = document.getElementById("TIT");
    if (TIT) {
        TIT.addEventListener('click', function() {
            textEditor.value = "========================\nTitle: [WIKI_TITLE]\n Age: [Age]\n========================";
        });


        TIT.onclick = function() {
             
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
            navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful');
            }, function(err) {
                // Error flow
                console.error(err);
            });
        };
        // On click event for the standard copy
        
    }
});

// Grabbing the current version from the manifest
document.addEventListener('DOMContentLoaded', function () {
    // Getting manifest
    let manifest = chrome.runtime.getManifest();
    let version = manifest.version;
    //making sure that you can have text infront of it
    document.getElementById("versionmanifest").textContent += version;
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

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('settings').addEventListener('click', function() {
        window.open('settings.html', '_blank')
        
    });
});

// Assuming you have a button to save the current text for a specific FN button
function saveTextForFN() {
    const fnNumber = document.getElementById("fnSelector").value;
    const textEditor = document.getElementById("textEditor");
    const text = textEditor.value; 
    localStorage.setItem(`FN${fnNumber}Text`, text);
}


// Function to load the saved text for an FN button into the textbox
function loadTextForFN(fnNumber) {
    const savedText = localStorage.getItem(`FN${fnNumber}Text`);
    if (savedText) {
        const textEditor = document.getElementById("textEditor");
        textEditor.value = savedText;
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    const saveButton = document.getElementById("saveFnText");
    if (saveButton) {
        saveButton.addEventListener('click', saveTextForFN);
    }
    // Add event listeners for FN buttons as previously described
    // Example for FN1
    const fn1Button = document.getElementById("FN1");
    if (fn1Button) {
        fn1Button.addEventListener('click', function() {
            loadTextForFN(1);
        });
    }
    // Repeat adding click listeners for FN2, FN3, FN4, FN5
    const fn2Button = document.getElementById("FN2");
    if (fn2Button) {
        fn2Button.addEventListener('click', function() {
            loadTextForFN(2);
        });
    }

    const fn3Button = document.getElementById("FN3");
    if (fn3Button) {
        fn3Button.addEventListener('click', function() {
            loadTextForFN();
        });
    }
});

