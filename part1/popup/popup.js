
const StartCountdown = document.getElementById("StartCountdown");
if (StartCountdown) {
    StartCountdown.onclick = function() {
        var text = "This is a test";
        navigator.clipboard.writeText(text).then(function() {
           console.log('Async: Copying to clipboard was successful');
        }, function(err) {
            console.error(err);
        
    });

}};
