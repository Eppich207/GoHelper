
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
        }
    }
}



function getCustomButtons() {
    chrome.storage.sync.get(null, function(items) {
        let customButtons = [];

        // Loop through all items in storage
        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                
                // Check if the item is an object before using the 'in' operator
                if (typeof item === 'object' && item !== null && 'customTag' in item) {
                    customButtons.push(item);
                }
            }
        }
        
        // Display the custom buttons
        if (customButtons.length > 0) {
            console.log("Retrieved custom buttons with customTag:", customButtons);
        } else {
            console.log("No custom buttons found with customTag");
        }
    });
}





function initializeSettings() {
    
    const createNewButton = document.getElementById("createNewButton");
    if (createNewButton) {
        createNewButton.addEventListener('click', saveNewButton, false);
    }

    const retrieveButton = document.getElementById("retrieveButton");
    if (retrieveButton) {
        retrieveButton.addEventListener('click', getCustomButtons, false);
    }
}


