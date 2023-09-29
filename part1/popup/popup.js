

const MSD = document.getElementById("MSD");
if (MSD) {
    MSD.onclick = function() {
        const textEditor = document.getElementById("textEditor");
        const text = textEditor.value; // Get the current value of textEditor
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    };
}


const StartCountdown1 = document.getElementById("StartCountdown1");
if (StartCountdown1) {
    StartCountdown1.onclick = function() {
        var text = "This is a test";
        navigator.clipboard.writeText(text).then(function() {
           console.log('Async: Copying to clipboard was successful');
        }, function(err) {
            console.error(err);
        });
    };
}

// Grabbing the current version from the manifest
document.addEventListener('DOMContentLoaded', function () {
    let manifest = chrome.runtime.getManifest();
    let version = manifest.version;
    document.getElementById("version").textContent += version;
});
