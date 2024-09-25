function createNewButton1() {
    
    let userInput = prompt("Please enter the new button's name:");
    if (userInput !== null) {
        console.log("User input:", userInput);
    }

    
    const buttonName = userInput;
    const textEditor = document.getElementById("newbuttontext");
    const text = textEditor.value;
    let data = {
        Name: buttonName,
        theme: text,
        notificationsEnabled: true
    };
    chrome.storage.sync.set(data, function() {});
    console.log('saved', data);

    
}

function initializeSettings() {
    
    const createNewButton = document.getElementById("createNewButton");
    if (createNewButton) {
        createNewButton.addEventListener('click', createNewButton1, false);
    }

}
