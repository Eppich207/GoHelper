document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
    checkAgentName()
    checkCopyOnExit();
    checkManifestVersion();
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

    const updateButton = document.getElementById("updateButton");
    if (updateButton) {
        updateButton.addEventListener('click', updateButton1, false);
    }

    const deleteButton = document.getElementById("deleteButton");
    if (deleteButton) {
        deleteButton.addEventListener('click', clearSyncedData, false);
    }

    const deleteSelectedButton = document.getElementById("deleteSelectedButton");
    if (deleteSelectedButton) {
        deleteSelectedButton.addEventListener('click', deleteStoredButton, false);
    }

    const downloadAllButtons = document.getElementById("downloadAllButtons");
    if (downloadAllButtons) {
        downloadAllButtons.addEventListener('click', fileDownload, false);
    }

}

function updateColorSelector(selectedButton) {
    const colorSelector = document.getElementById("colorSelector");
    if (selectedButton && selectedButton.customColor) {
        colorSelector.value = selectedButton.customColor;
    } else {
        colorSelector.value = "";
    }
}

function clearSyncedData() {
    alert('Attention, you are about clear all data. This operation is useful if the addin is not running properly. No restore is possible');
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
        const colorSelector = document.getElementById("colorSelector");
        let newCustomColor = colorSelector.value;
        if (!newCustomColor) {
            newCustomColor = prompt("Please enter the new button's color. Available colors: darkmagenta, teal, goldenrod, darkred, mediumblue, black, dimgray. Please type the color as presented");
        }
        if (newCustomColor !== null) {
            let newButtonText = prompt("Please enter the new button's text:");
            if (newButtonText !== null) {
                let userCreatedButtons = {
                    Name: newButtonName,
                    Text: newButtonText,
                    customTag: 'Custom buttons',
                    customColor: newCustomColor 
                };
                chrome.storage.sync.set({ [newButtonName]: userCreatedButtons }, function() {
                    alert("Button created successfully!");
                    getCustomButtons();
                });
            }
        }
    }
}

const fileInput = document.getElementById('jsonFileInput');
const inputDocument = document.getElementById('inputDocument');
fileInput.addEventListener('change', fileUpload);

function fileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const jsonData = JSON.parse(e.target.result);

                Object.keys(jsonData).forEach(key => {
                    let buttonData = jsonData[key];

                    
                    if (typeof buttonData === 'object' && buttonData !== null && buttonData.Name && buttonData.Text && buttonData.customTag) {
                        let importedButton = {
                            Name: buttonData.Name,
                            Text: buttonData.Text,
                            customTag: buttonData.customTag,
                            customColor: buttonData.customColor
                        };
                        chrome.storage.sync.set({ [buttonData.Name]: importedButton }, function() {
                            console.log(`Imported button: ${buttonData.Name}`);
                        });

                    } else {
                        console.warn(`Skipping entry ${key}: Invalid button data`, buttonData);
                    }
                });
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
        reader.readAsText(file);
        alert("Import complete");
    } else {
        console.warn("No file selected.");
    }
}

function fileDownload() {
    chrome.storage.sync.get(null, function(items) {
        
        if (chrome.runtime.lastError) {
            console.error("Error retrieving data:", chrome.runtime.lastError);
            return;
        }

        if (Object.keys(items).length === 0) {
            alert("No data available to download.");
            return;
        }

        try {

            let buttonExportList = [];
            for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                if (typeof item === 'object' && item !== null && 'customTag' in item) {
                    buttonExportList.push(item);
                }
            }
            }
            const jsonData = JSON.stringify(buttonExportList, null, 2);

            const blob = new Blob([jsonData], { type: "application/json" });

            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "custom_buttons.json";
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);

        } catch (error) {
            console.error("Error processing JSON data:", error);
        }
    });
}

function deleteStoredButton() {
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
        
        let userConfirmation = prompt("Are you sure to delete this button? y/n:");
        if (userConfirmation != 'y') {
            return;
        }


        const dropdown = document.getElementById("buttonDropdown");
        const selectedButtonName = dropdown.value;  
        chrome.storage.sync.remove(selectedButtonName, function() {
            if (chrome.runtime.lastError) {
                console.error("Error removing item: ", chrome.runtime.lastError);
            }
        });        
    });
}

function updateButton1() {

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
        const categoryDropdown = document.getElementById("buttonCatagories");
        const colorSelector = document.getElementById("colorSelector");
        const savedButtonCategory = categoryDropdown.value;
        const selectedButtonName = dropdown.value;
        const savedButton = customButtons.find(button => button.Name === selectedButtonName);
        
        const savedButtonText = savedButton.Text;
        const newButtonTextarea = document.getElementById("newbuttontext");
        const selectedColor = colorSelector.value;
        

            if (savedButtonText !== newButtonTextarea.value || savedButton.customColor !== selectedColor) {
                chrome.storage.sync.set({ [selectedButtonName]: { Name: selectedButtonName, Text: newButtonTextarea.value, customTag: savedButtonCategory, customColor: selectedColor || savedButton.customColor} }, function() {
                });
                getCustomButtons(selectedButtonName); 
                alert('The button text was successfully updated.');
            } else {
                alert('The button text did not change. No update was made.');
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

            chrome.storage.sync.set({ [agentFName]: agentName });
        
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
        } else {
            console.alert("no name found");
        }


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
        
        } else { 
            saveAgentName();
        }
    });

}

function toggleCopyOnExit() {
    const checkedStatus = document.getElementById('toggleCopyOnExit').checked;
    chrome.storage.sync.set({ copyOnExit: checkedStatus }, function() {
        console.log('copyOnExit state is set to:', checkedStatus);
    });
}
document.getElementById('toggleCopyOnExit').addEventListener('change', toggleCopyOnExit);

function checkCopyOnExit() {
    chrome.storage.sync.get('copyOnExit', function(result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            const isChecked = result.copyOnExit || false; 
            document.getElementById('toggleCopyOnExit').checked = isChecked;

        }
    });
}
document.addEventListener('DOMContentLoaded', checkCopyOnExit);

function getButtonsByCategory() {
    const categoryDropdown = document.getElementById("buttonCatagories");
    const selectedCategory = categoryDropdown.value; 
    let filteredButtons = [];
    
    chrome.storage.sync.get(null, function(items) {
        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                if (typeof item === 'object' && item !== null) {
                    for (let prop in item) {
                        if (prop !== "Name" && prop !== "Text" && prop.toLowerCase().includes("tag")) {
                            if (item[prop] === selectedCategory) {
                                filteredButtons.push(item);
                                break;
                            }
                        }
                    }
                }
            }
        }
        
        const dropdown = document.getElementById("buttonDropdown");
        dropdown.innerHTML = '<option value="">Select a button</option>';
        
        filteredButtons.forEach(button => {
            let option = document.createElement("option");
            option.value = button.Name;  
            option.textContent = button.Name; 
            dropdown.appendChild(option);
        });
        
        dropdown.onchange = function() {
            const selectedButtonName = dropdown.value;
            const selectedButton = filteredButtons.find(button => button.Name === selectedButtonName);
            const newButtonTextarea = document.getElementById("newbuttontext");
            newButtonTextarea.value = selectedButton ? selectedButton.Text : "";
            getCustomButtons();
        };
    });
}
document.getElementById("buttonCatagories").addEventListener("change", getButtonsByCategory);

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
        const currentSelection = selectionToPreserve || dropdown.value;

        dropdown.innerHTML = '<option value="">Select a button</option>';
        

        customButtons.forEach(button => {
            let option = document.createElement("option");
            option.value = button.Name;  
            option.textContent = button.Name; 
            dropdown.appendChild(option);
        });

        if (currentSelection) {
            dropdown.value = currentSelection;
        }
       
        if (!dropdown.hasChangeListener) {
            dropdown.addEventListener('change', function() {
                const selectedButtonName = dropdown.value;
                if (!selectedButtonName) return;
                
                const selectedButton = customButtons.find(button => button.Name === selectedButtonName);
                const newButtonTextarea = document.getElementById("newbuttontext");
                
                if (selectedButton) {
                    newButtonTextarea.value = selectedButton.Text;
                    updateColorSelector(selectedButton);
                } else {
                    newButtonTextarea.value = "";
                    updateColorSelector(null);
                }
            });
            dropdown.hasChangeListener = true;
        }
    });
}

async function checkManifestVersion() {
    const manifest = chrome.runtime.getManifest();
    const localVersion = manifest.version;

    const versionDisplay = document.getElementById("versionmanifest");
    versionDisplay.innerHTML = `<h4>You're on the lastest version ${localVersion}</h4>`;
    const remoteManifestUrl = 'https://raw.githubusercontent.com/Eppich207/GoHelper/refs/heads/main/part1/manifest.json';
    
    try {
        const response = await fetch(remoteManifestUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const remoteManifest = await response.json();
        const remoteVersion = remoteManifest.version;
        
        if (remoteVersion !== localVersion) {
            versionDisplay.innerHTML = `<h4 style="color: white;">Version: ${localVersion} (Update ${remoteVersion} available)</h4>`;
            }
    } catch (error) {
        console.error('Error checking manifest version:', error);
    }
}