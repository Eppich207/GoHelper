function asyncCopy() {
    const textEditor = document.getElementById("textEditor");
    const text = textEditor.value;
    navigator.clipboard.writeText(text).then(function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

const CopyButtons = document.querySelectorAll('.copy-buttons');
    CopyButtons.forEach(button => {
    button.addEventListener("click", asyncCopy);
});


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
                resolve(buttonsArray); 
            } else {
                resolve([]); 
            }
        });
    });
}


getCustomButtonsPU().then(buttons => {
    customButtons = buttons;
    renderButtons(customButtons);
});

function renderButtons(buttonsArray) {

    const buttonsContainer = document.getElementById("dynamicButtonsContainer");
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
        newButton.addEventListener('dblclick', asyncCopy);
        buttonsContainer.appendChild(newButton);
    });

}

document.addEventListener('DOMContentLoaded', (event) => {
    
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

console.log("popup.js loaded");


function copyOnExit() {
    const textEditor = document.getElementById("textEditor");
    if (textEditor) {
        textEditor.select();  
        try {
            document.execCommand("copy");
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    } else {
        console.error('Text editor not found!');
    }
}

window.addEventListener('blur', copyOnExit);