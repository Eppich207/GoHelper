

document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
    getCustomButtons();
    checkAgentName()
});

function initializeSettings() {
    const createNewButton = document.getElementById("createNewButton");
    if (createNewButton) {
        createNewButton.addEventListener('click', saveNewButton, false);
    }

    const retrieveButton = document.getElementById("retrieveButton");
    if (retrieveButton) {
        retrieveButton.addEventListener('click', getCustomButtons, false);
    }

    const deleteButton = document.getElementById("deleteButton");
    if (deleteButton) {
        deleteButton.addEventListener('click', clearSyncedData, false);
    }
}

function clearSyncedData() {
    alert('Attention, you are about to enter a menu to clear data. This operation is useful if the addin is not running properly.');
    const dateObj = new Date();
    let datePromt = prompt("Are you sure to clear all the buttons? Please type: " +'"'+ dateObj.toDateString() + '"');
    if (datePromt == dateObj.toDateString()) {
        chrome.storage.sync.clear(function() {
            alert('All data cleared from storage');
            const newButtonTextarea = document.getElementById("newbuttontext");
            newButtonTextarea.value = "";
            getCustomButtons();
        });
    } else {
        console.log('Stopping operation');
    }
}

function saveNewButton() {
    let newButtonName = prompt("Please enter the new button's name:");
    if (newButtonName !== null) {
        let newButtonText = prompt("Please enter the new button's text:");
        if (newButtonText !== null) {
            console.log(newButtonText, "+" ,newButtonName, "created with success");

            let userCreatedButtons = {
                Name: newButtonName,
                Text: newButtonText,
                customTag: 'buttonTag' 
            };

            chrome.storage.sync.set({ [newButtonName]: userCreatedButtons }, function() {
                console.log('Button saved:', userCreatedButtons);
            });

            getCustomButtons();
        }
    }
}


function getCustomButtons() {
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

        const dropdown = document.getElementById("buttonDropdown");
        dropdown.innerHTML = '<option value="">Select a button</option>';

        customButtons.forEach(button => {
            let option = document.createElement("option");
            option.value = button.Name;  
            option.textContent = button.Name; 
            dropdown.appendChild(option);
        });

       
        dropdown.addEventListener('change', function() {
            const selectedButtonName = dropdown.value;
            const selectedButton = customButtons.find(button => button.Name === selectedButtonName);
            const newButtonTextarea = document.getElementById("newbuttontext");
            if (selectedButton) {
                newButtonTextarea.value = selectedButton.Text; 
            } else {
                newButtonTextarea.value = ""; 
            }
        });

        if (customButtons.length > 0) {
            console.log("Retrieved custom buttons with customTag:", customButtons);
        } else {
            console.log("No custom buttons found with customTag");
        }
    });
}



function saveAgentName() {
    let agentFName = prompt("Please enter your name:");
    if (agentFName !== null) {
        
        
            console.log(agentFName, "created with success");

            let agentName = {
                Name: agentFName,
                FirstName: 'FirstName' 
            };

            chrome.storage.sync.set({ [agentFName]: agentName }, function() {
                console.log('Button saved:', agentName);
            });
        
    }
    checkAgentName();
}

function getAgentName() {
    chrome.storage.sync.get(null, function(items) {
        let FirstName = [];
        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                if (typeof item === 'object' && item !== null && 'FirstName' in item) {
                    FirstName.push(item);
                }
            }
        }

        if (FirstName.length > 0) {
            console.log("Retrieved FN");
        } else {
            console.alert("null");
        }

        console.log('FirstName:', FirstName)
    });
}

function checkAgentName() {
    
    chrome.storage.sync.get(null, function(items) {
        let FirstName = [];
        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                if (typeof item === 'object' && item !== null && 'FirstName' in item) {
                    FirstName.push(item);
                }
            }
        }

        if (FirstName.length > 0) {
            console.log("Retrieved FN");
        } else {
            saveAgentName();
        }
    });

}
