

function SimpleCopy() {
        console.log('Async:1');
        const textEditor = document.getElementById("textEditor");
        const text = textEditor.value; 
        // Console.log
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async:Copied text');
        }, function(err) {
            // Error flow
            console.error('Async: Could not copy text: ', err);
        });
    }


function assignCopyFunction(buttonIds) {
    buttonIds.forEach(function(id) {
        const button = document.getElementById(id);
        if (button) {
            button.onclick = SimpleCopy;
        }
    });
}
    

window.addEventListener('DOMContentLoaded', (event) => {

    const textEditor = document.getElementById("textEditor");

    // Opening Button
    const MDS = document.getElementById("MDS");
    if (MDS) {
        MDS.addEventListener('click', function() {
            let MSDstr ="Hi , ik ben Maarten van EY technology, ik zie een open ticket over . Hoe is de stand van zaken?";
            textEditor.value = MSDstr;
        });
        MDS.addEventListener('dblclick', SimpleCopy) 
    }

    // AD fup notice Button
    const COP = document.getElementById("COP");
    if (COP) {
        COP.addEventListener('click', function() {
            textEditor.value = "We tried to reach out, without any luck. We will be trying again next business day.";
        });
        COP.addEventListener('dblclick', SimpleCopy) 
    }

    // Closing Button
    const CCL = document.getElementById("CCL");
    if (CCL) {
        CCL.addEventListener('click', function() {
            textEditor.value = "Mocht je nog wat tijd over hebben, kan je dan feedback geven in de mail de nu je kant op komt? En een hele fijne dag nog!";
        });
        CCL.addEventListener('dblclick', SimpleCopy) 
    }

    // Away message Button
    const AWY = document.getElementById("AWY");
    if (AWY) {
        AWY.addEventListener('click', function() {
            textEditor.value = "Ik zie ook dat je momenteel niet beschikbaar bent. Wanneer heb je tijd om hier naar te kijken? Als ik geen antwoord ontvang kom ik later vandaag bij je terug";
        });
        AWY.addEventListener('dblclick', SimpleCopy) 
    }

    // Follow up date Button
    const FUP = document.getElementById("FUP");
    if (FUP) {
        FUP.addEventListener('click', function() {
            const dateObj = new Date;
            textEditor.value = "FUP 1 " + dateObj.toDateString();
        });
        FUP.addEventListener('dblclick', SimpleCopy) 
    }



    // Assigning copy button array
    assignCopyFunction(["CPB1", "CPB2", "CPB3"]);

    const saveButton = document.getElementById("saveFnText");
    if (saveButton) {
        saveButton.addEventListener('click', saveTextForFN);
    }

    // Add event listeners for FN buttons as previously described
    // Example for FN1
    const fn1Button = document.getElementById("FN1");
    if (fn1Button) {
        fn1Button.addEventListener('click', function() {
            loadTextForFN(1);
        });
    }
    // Repeat adding click listeners for FN2, FN3, FN4, FN5
    const fn2Button = document.getElementById("FN2");
    if (fn2Button) {
        fn2Button.addEventListener('click', function() {
            loadTextForFN(2);
        });
    }

    const fn3Button = document.getElementById("FN3");
    if (fn3Button) {
        fn3Button.addEventListener('click', function() {
            loadTextForFN(3);
        });
    }

    const fn4Button = document.getElementById("FN4");
    if (fn4Button) {
        fn4Button.addEventListener('click', function() {
             loadTextForFN(4);
        });
    }      

    const fn5Button = document.getElementById("FN5");
    if (fn5Button) {
        fn5Button.addEventListener('click', function() {
            loadTextForFN(5);
        });
    }

});



document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('settings').addEventListener('click', function() {
        window.open('settings.html', '_blank')
        
    });
});

// Saving funtion for Save FN button inside settings.html
function saveTextForFN() {
    const fnNumber = document.getElementById("fnSelector").value;
    const textEditor = document.getElementById("textEditor1");
    const text = textEditor.value; 
    localStorage.setItem(`FN${fnNumber}Text`, text);
}



// Function to load the saved text for an FN button into the textbox
function loadTextForFN(fnNumber) {
    const savedText = localStorage.getItem(`FN${fnNumber}Text`);
    if (savedText) {
        const textEditor = document.getElementById("textEditor");
        textEditor.value = savedText;
    }
}



