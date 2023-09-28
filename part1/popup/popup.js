

const StartCountdown = document.getElementById("StartCountdown");
if (StartCountdown) {
    StartCountdown.onclick = function() {
        const textEditor = document.getElementById("textEditor");
        const text = textEditor.value; // Get the current value of textEditor
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    };
}

// Similar code for StartCountdown1, if needed
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