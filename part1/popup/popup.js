
const StartCountdown = document.getElementById("StartCountdown");
if (StartCountdown) {
    StartCountdown.onclick = function() {
        var text = "This is a test1";
        navigator.clipboard.writeText(text).then(function() {
           console.log('Async: Copying to clipboard was successful');
        }, function(err) {
            console.error(err);
        
    });

}};


const StartCountdown1 = document.getElementById("StartCountdown1");
if (StartCountdown1) {
    StartCountdown1.onclick = function() {
        var text1 = "This is a test2";
        navigator.clipboard.writeText(text1).then(function() {
           console.log('Async: Copying to clipboard was successful');
        }, function(err) {
            console.error(err);
        
    });

}};
