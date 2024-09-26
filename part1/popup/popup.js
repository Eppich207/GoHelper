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


    const MDS = document.getElementById("MDS");
    if (MDS) {
        MDS.addEventListener('click', function() {

            let MSDstr = "Hi , ik ben Maarten van service desk, ik zie een open ticket over . Hoe is de stand van zaken?";
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

            textEditor.value = "If you have any additional time, could you leave some feedback in the email comming your way now? Thanks, and I hope you have a great day!";
        });
        CCL.addEventListener('dblclick', SimpleCopy);
    }

    const AWY = document.getElementById("AWY");
    if (AWY) {
        AWY.addEventListener('click', function() {

            textEditor.value = "I see you have not been able to respond, I will be placing the ticket for the time being and reach out next business day.";
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

function getCustomButtonsPU() {
    chrome.storage.sync.get(null, function(items) {
        let customButtons = [];
        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                if (typeof item === 'object' && item !== null && 'customTag' in item) {
                    customButtons.push(item);
                }
            }
        }

        if (customButtons.length > 0) {
            console.log("Retrieved custom buttons with customTag");
        } else {
            console.log("No custom buttons found with customTag");
        }
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    
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

