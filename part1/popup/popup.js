console.log("popup.js loaded");



function SimpleCopy() {
    const textEditor = document.getElementById("textEditor");
    const text = textEditor.value;
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async:0');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

const CopyButtons = document.querySelectorAll('.copy-buttons');
    CopyButtons.forEach(button => {
        console.log("click");
    button.addEventListener("click", SimpleCopy);
});


function initializePopup() {

    const textEditor = document.getElementById("textEditor");

    scrapeOpenedByInput();

    const MDS = document.getElementById("MDS");
    if (MDS) {
        MDS.addEventListener('click', function() {
            let MSDstr = "Hi , I'm " +  FirstName[0].Name + " from the Hub ServiceDesk, I'm reaching out in regards to an open ticket .";
            textEditor.value = MSDstr;
        });
        MDS.addEventListener('dblclick', SimpleCopy);
    }

    const COP = document.getElementById("COP");
    if (COP) {
        COP.addEventListener('click', function() {

            textEditor.value = "We tried to reach out, without any luck. We will be trying again next business day.";
        });
        COP.addEventListener('dblclick', SimpleCopy);
    }

    const CCL = document.getElementById("CCL");
    if (CCL) {
        CCL.addEventListener('click', function() {

            textEditor.value = "If you have any additional time, could you leave some feedback in the email comming your way now? Thank you, and I hope you have a great day!";
        });
        CCL.addEventListener('dblclick', SimpleCopy);
    }

    const AWY = document.getElementById("AWY");
    if (AWY) {
        AWY.addEventListener('click', function() {

            textEditor.value = "I see you have not been able to respond, I will be placing the ticket for the time being and will be waiting for your response.";
        });
        AWY.addEventListener('dblclick', SimpleCopy);
    }

    const FUP = document.getElementById("FUP");
    if (FUP) {
        FUP.addEventListener('click', function() {

            const dateObj = new Date();
            textEditor.value = "FUP 1 " + dateObj.toDateString();
        });
        FUP.addEventListener('dblclick', SimpleCopy);
    }

}

let customButtons = []; 
function getCustomButtonsPU() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, function(items) {
            let buttonsArray = [];

            for (let key in items) {
                if (items.hasOwnProperty(key)) {
                    let item = items[key];
                    if (typeof item === 'object' && item !== null && 'customTag' in item) {
                        buttonsArray.push(item); 
                    }
                }
            }

            if (buttonsArray.length > 0) {
                console.log("Retrieved custom buttons with customTag:", buttonsArray);
                resolve(buttonsArray); 
            } else {
                console.log("No custom buttons found with customTag");
                resolve([]); 
            }
        });
    });
}


getCustomButtonsPU().then(buttons => {
    customButtons = buttons;
    renderButtons(customButtons);
});

let FirstName = [];
function getAgentName() {
    chrome.storage.sync.get(null, function(items) {
        
        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                if (typeof item === 'object' && item !== null && 'FirstName' in item) {
                    FirstName.push(item);
                }
            }
        }
        console.log('FirstName:', FirstName)
        if (FirstName.length > 0) {
            console.log("Retrieved FN");
        } else {
            alert("Please set your name in the settings menu");
        }
    });
}

// Function to render buttons into the popup.html
function renderButtons(buttonsArray) {

    const buttonsContainer = document.getElementById("dynamicButtonsContainer");
    buttonsContainer.innerHTML = "";

    buttonsArray.forEach(button => {
        let newButton = document.createElement("button");
        newButton.textContent = button.Name; 
        newButton.classList.add("dynamic-button");
        newButton.classList.add("button-normal"); 
        newButton.addEventListener("click", function() {
            const textEditor = document.getElementById("textEditor");
            textEditor.value = button.Text;
        });
        buttonsContainer.appendChild(newButton);
    });

    console.log("Rendered buttons:", buttonsArray);
}


function scrapeOpenedByInput() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];

        // Inject content script to scrape 'opened_by_input' values
        chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            function: scrapeOpenedByFromHTML // This function will run inside the active tab
        }, (results) => {
            if (chrome.runtime.lastError || !results || !results[0] || !results[0].result) {
                console.error('Error scraping the page or no result found');
                return;
            }

            const openedByValues = results[0].result;
            displayOpenedByValues(openedByValues);
        });
    });
}

// Function that runs inside the active tab to scrape 'opened_by_input' values
function scrapeOpenedByFromHTML() {
    const values = [];
    const openedByInputs = document.querySelectorAll('now-ufx-page [name="opened_by_input"]');
    openedByInputs.forEach(input => {
        const value = input.getAttribute('value');
        if (value) {
            values.push(value);
        }
    });
    return values;
}

// Function to display the scraped values in the popup
function displayOpenedByValues(values) {
    const outputContainer = document.getElementById('openedByOutput');
    outputContainer.innerHTML = ''; // Clear previous values

    values.forEach(value => {
        const p = document.createElement('p');
        p.textContent = value;
        outputContainer.appendChild(p);
    });
}



document.addEventListener('DOMContentLoaded', (event) => {

    getAgentName();
    initializePopup();
    getCustomButtonsPU();

    
    const versionElement = document.getElementById("versionmanifest");
    if (versionElement) {
        
        let manifest = chrome.runtime.getManifest();
        let version = manifest.version;
        versionElement.textContent += version;
    }


    const settingsButton = document.getElementById('settings');
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            window.open('settings.html', '_blank');
        });
    }
});


