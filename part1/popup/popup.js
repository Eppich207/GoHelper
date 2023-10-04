

// Grabbing the textbox area and copying it
const MSD = document.getElementById("MSD");
if (MSD) {
    // On click event for MSD
    MSD.onclick = function() {
        const textEditor = document.getElementById("textEditor");
        const text = textEditor.value; 
        // Console.log
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async:Copied text');
        }, function(err) {
            // Error flow
            console.error('Async: Could not copy text: ', err);
        });
    };
}


const StartCountdown1 = document.getElementById("StartCountdown1");
if (StartCountdown1) {
    // On click event for the standard copy
    StartCountdown1.onclick = function() {
        var text = "Buenas dias, mi nombre es Maarten"; // Best regards, Rick
        // Console.log
        navigator.clipboard.writeText(text).then(function() {
           console.log('Async: Copying to clipboard was successful');
        }, function(err) {
            // Error flow
            console.error(err);
        });
    };
}

window.addEventListener('DOMContentLoaded', (event) => {

    const textEditor = document.getElementById("textEditor");

    const MDS = document.getElementById("MDS");
    if (MDS) {
        MDS.addEventListener('click', function() {
            textEditor.value = "Pain itself";
        });
    }

    const COP = document.getElementById("COP");
    if (COP) {
        COP.addEventListener('click', function() {
            textEditor.value = "Another text";
        });
    }

});

// Grabbing the current version from the manifest
document.addEventListener('DOMContentLoaded', function () {
    // Getting manifest
    let manifest = chrome.runtime.getManifest();
    let version = manifest.version;
    //making sure that you can have text infront of it
    document.getElementById("version").textContent += version;
});
