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



window.addEventListener('DOMContentLoaded', (event) => {

    const textEditor = document.getElementById("textEditor");

    const MDS = document.getElementById("MDS");
    if (MDS) {
        MDS.addEventListener('click', function() {
            let MSDstr ="Hi , ik ben Maarten van EY technology, ik zie een open ticket over . Hoe is de stand van zaken?";
            textEditor.value = MSDstr;
        });
    }

    const COP = document.getElementById("COP");
    if (COP) {
        COP.addEventListener('click', function() {
            textEditor.value = "Hello (Name), Im (Agent)...";
        });
    }

    const CCL = document.getElementById("CCL");
    if (CCL) {
        CCL.addEventListener('click', function() {
            textEditor.value = "Als je het niet erg vind, sluit ik nu dan je ticket. Mocht je nog wat tijd over hebben, kan je dan feedback geven in de mail de nu je kant op komt?";
        });
    }

    const AWY = document.getElementById("AWY");
    if (AWY) {
        AWY.addEventListener('click', function() {
            textEditor.value = "Ik zie dat je momenteel niet beschikbaar bent. Wanneer heb je tijd om hier naar te kijken? Als ik geen antwoord ontvang kom ik later vandaag bij je terug";
        });
    }

    const FUP = document.getElementById("FUP");
    
    if (FUP) {
        FUP.addEventListener('click', function() {
            const dateObj = new Date;
            textEditor.value = "FUP " + dateObj.toDateString();
        });
    }



    // Grabbing the textbox area and copying it
const YWA = document.getElementById("YWA");
if (YWA) {
    // On click event for MSD
    YWA.onclick = function() {
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
    };
}



const StartCountdown1 = document.getElementById("StartCountdown1");
if (StartCountdown1) {
    // On click event for the standard copy
    StartCountdown1.onclick = function() {
        var text = "Buenas dias, mi nombre es Maarten"; 
        // Console.log
        navigator.clipboard.writeText(text).then(function() {
           console.log('Async: Copying to clipboard was successful');
        }, function(err) {
            // Error flow
            console.error(err);
        });
    };
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