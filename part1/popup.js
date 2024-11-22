let closeandcopy = false;

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
                    const dropdown = document.getElementById("buttonCatagories");
                    const temp = dropdown.value;
                    console.log(temp);
                    if (typeof item === 'object' && item !== null && temp in item) {
                        console.log(item);
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

let displayedButtons = []; 

function getButtonCatagories() {
    chrome.storage.sync.get(null, function(items) {
        
        let categoryItems = [];
        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                if (typeof item === 'object' && item !== null && 'customTag' in item) {
                    categoryItems.push(item.customTag); 
                }
            }
        }

        const uniqueCategoryItems = [...new Set(categoryItems)];

        const dropdown = document.getElementById("buttonCatagories");
        dropdown.innerHTML = '<option value="">Select</option>';
        
        uniqueCategoryItems.forEach(customTag => {
            let option = document.createElement("option");
            option.value = customTag;  
            option.textContent = customTag; 
            dropdown.appendChild(option);
        });

        dropdown.addEventListener('change', function() {
            const selectedTag = dropdown.value; 
            displayedButtons = []; 
            for (let key in items) {
                if (items.hasOwnProperty(key)) {
                    const item = items[key];
                    if (typeof item === 'object' && item !== null && item.customTag === selectedTag) {
                        displayedButtons.push(item); 
                    }
                }
            }

            console.log('Displayed buttons:', displayedButtons); 
            updateDisplayedButtons(); 
        });
    });
}




function renderButtons() {
    const buttonsContainer = document.getElementById("dynamicButtonsContainer");
    buttonsContainer.innerHTML = ''; 

    displayedButtons.forEach(button => { 
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

function updateDisplayedButtons() {
    const dropdown = document.getElementById("buttonCatagories");
    const selectedCategory = dropdown.value;

    if (!selectedCategory) {
        console.warn('No category selected. Clearing displayed buttons.');
        displayedButtons = [];
        renderButtons(); 
        return;
    }

    console.log('Selected category:', selectedCategory);

    getCustomButtonsPU().then(buttons => {
        displayedButtons = buttons.filter(button => button.customTag === selectedCategory);
        console.log('Filtered buttons:', displayedButtons);
        renderButtons(); 
    }).catch(err => {
        console.error('Error fetching or filtering buttons:', err);
    });
}


document.addEventListener('DOMContentLoaded', (event) => {
    

    getButtonCatagories();
    updateDisplayedButtons();

    checkCopyOnExit1(function(isChecked) {
        closeandcopy = isChecked;
    });


    const versionElement = document.getElementById("versionmanifest");
    if (versionElement) {
        
        let manifest = chrome.runtime.getManifest();
        let version = manifest.version;
        versionElement.textContent += version;
    }


    const settingsButton = document.getElementById('settings');
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            window.open('popup/settings.html', '_blank');
        });
    }
});

function updateDisplayedButtons() {
    getCustomButtonsPU().then(buttons => {
        customButtons = buttons;
        renderButtons(customButtons);
    });
}

console.log("popup.js loaded");


function copyOnExit() {
    const textEditor = document.getElementById("textEditor");
    if (closeandcopy == true) {
        if (textEditor) {
            textEditor.select();  
            try {
                document.execCommand("copy");
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    } else {
        return false;
    }
}
window.addEventListener('blur', copyOnExit);


function checkCopyOnExit1(callback) {
    chrome.storage.sync.get('copyOnExit', function(result) {
        const isChecked = result.copyOnExit || false;
        callback(isChecked);
    });
}

document.addEventListener('DOMContentLoaded', checkCopyOnExit1);



