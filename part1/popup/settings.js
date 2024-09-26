

document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
    getCustomButtons();
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
    alert('Data cannot be restored after deletion');
    const dateObj = new Date();
    let datePromt = prompt("Are you sure to clear all the buttons? Please enter: " + dateObj.toDateString());
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

        // Get the dropdown element
        const dropdown = document.getElementById("buttonDropdown");

        // Clear the dropdown (in case it's been populated previously)
        dropdown.innerHTML = '<option value="">Select a button</option>';

        // Populate the dropdown with button names
        customButtons.forEach(button => {
            let option = document.createElement("option");
            option.value = button.Name;  // Set the value to the button name
            option.textContent = button.Name;  // Display the button name
            dropdown.appendChild(option);  // Add the option to the dropdown
        });

        // Handle dropdown selection change
        dropdown.addEventListener('change', function() {
            // Get the selected button's name
            const selectedButtonName = dropdown.value;
            
            // Find the button in customButtons array
            const selectedButton = customButtons.find(button => button.Name === selectedButtonName);
            
            // Display the corresponding text in the textarea
            const newButtonTextarea = document.getElementById("newbuttontext");
            if (selectedButton) {
                newButtonTextarea.value = selectedButton.Text; // Display the button's text in the textarea
            } else {
                newButtonTextarea.value = ""; // Clear the textarea if no valid button is selected
            }
        });

        // Log to confirm custom buttons are retrieved
        if (customButtons.length > 0) {
            console.log("Retrieved custom buttons with customTag:", customButtons);
        } else {
            console.log("No custom buttons found with customTag");
        }
    });
}



    /*const saveButton = document.getElementById("saveFnText");
    if (saveButton) {
        console.log("click!");
        saveButton.addEventListener('click', saveTextForFN);
        console.log("executed fx")
    }*/



/* function saveTextForFN() {
    const fnNumber = document.getElementById("fnSelector").value;
    console.log(fnNumber);
    const textEditor1 = document.getElementById("textEditor1");
    const text = textEditor1.value;
    console.log(text);

    let data = {};
    data[`FN${fnNumber}Text`] = text;
    chrome.storage.sync.set(data, function() {
        
    });

}

function loadTextForFN(fnNumber) {
    
    chrome.storage.sync.get(`FN${fnNumber}Text`, function(result) {
        if (result[`FN${fnNumber}Text`]) {
            const textEditor = document.getElementById("textEditor");
            textEditor.value = result[`FN${fnNumber}Text`];
            
        } else {
            
        }
    });
}
    */
