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

let customButtons = []; // Declare a constant to store the custom buttons array

// Modify getCustomButtons to return the array of custom buttons
function getCustomButtonsPU() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, function(items) {
            let buttonsArray = [];

            // Loop through all items in storage and filter those with customTag
            for (let key in items) {
                if (items.hasOwnProperty(key)) {
                    let item = items[key];
                    if (typeof item === 'object' && item !== null && 'customTag' in item) {
                        buttonsArray.push(item); // Push to array if it has the customTag
                    }
                }
            }

            if (buttonsArray.length > 0) {
                console.log("Retrieved custom buttons with customTag:", buttonsArray);
                resolve(buttonsArray); // Resolve the promise with the buttons array
            } else {
                console.log("No custom buttons found with customTag");
                resolve([]); // Resolve with an empty array if none found
            }
        });
    });
}

// Fetch and store custom buttons in constant memory on script load
getCustomButtonsPU().then(buttons => {
    customButtons = buttons; // Store the array in the global constant
    renderButtons(customButtons); // Call renderButtons (which we'll define in renderButtons.js)
});


// Function to render buttons into the popup.html
function renderButtons(buttonsArray) {
    const buttonsContainer = document.getElementById("dynamicButtonsContainer");

    // Clear the container before rendering new buttons
    buttonsContainer.innerHTML = '';

    buttonsArray.forEach(button => {
        let newButton = document.createElement("button");
        newButton.textContent = button.Name; 
        newButton.classList.add("dynamic-button");
        newButton.classList.add("button-normal"); 
        newButton.addEventListener("click", function() {
            const textEditor = document.getElementById("textEditor");
            textEditor.value = button.Text;
        });

        // Append the new button to the container
        buttonsContainer.appendChild(newButton);
    });

    console.log("Rendered buttons:", buttonsArray);
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

