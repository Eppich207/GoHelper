console.log("popup.js loaded");


function SimpleCopy() {
    
    const textEditor = document.getElementById("textEditor");
    const text = textEditor.value;
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async:0');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

const CopyButtons = document.querySelectorAll('.copy-buttons');
    CopyButtons.forEach(button => {
        console.log("click");
    button.addEventListener("click", SimpleCopy);
});


function initializePopup() {

    const textEditor = document.getElementById("textEditor");


    const MDS = document.getElementById("MDS");
    if (MDS) {
        MDS.addEventListener('click', function() {

            let MSDstr = "Hi , ik ben Maarten van service desk, ik zie een open ticket over . Hoe is de stand van zaken?";
            textEditor.value = MSDstr;
        });
        MDS.addEventListener('dblclick', SimpleCopy);
    }

    const COP = document.getElementById("COP");
    if (COP) {
        COP.addEventListener('click', function() {

            textEditor.value = "We tried to reach out, without any luck. We will be trying again next business day.";
        });
        COP.addEventListener('dblclick', SimpleCopy);
    }

    const CCL = document.getElementById("CCL");
    if (CCL) {
        CCL.addEventListener('click', function() {

            textEditor.value = "If you have any additional time, could you leave some feedback in the email comming your way now? Thanks, and I hope you have a great day!";
        });
        CCL.addEventListener('dblclick', SimpleCopy);
    }

    const AWY = document.getElementById("AWY");
    if (AWY) {
        AWY.addEventListener('click', function() {

            textEditor.value = "I see you have not been able to respond, I will be placing the ticket for the time being and reach out next business day.";
        });
        AWY.addEventListener('dblclick', SimpleCopy);
    }

    const FUP = document.getElementById("FUP");
    if (FUP) {
        FUP.addEventListener('click', function() {

            const dateObj = new Date();
            textEditor.value = "FUP 1 " + dateObj.toDateString();
        });
        FUP.addEventListener('dblclick', SimpleCopy);
    }

  


    const fn1Button = document.getElementById("FN1");
    if (fn1Button) {
        fn1Button.addEventListener('click', function() {
            loadTextForFN(1);
        });

    }
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
}

function initializeSettings() {
    
    const saveButton = document.getElementById("saveFnText");
    if (saveButton) {
        console.log("click!");
        saveButton.addEventListener('click', saveTextForFN);
        console.log("executed fx")
    }

}


function saveTextForFN() {
    const fnNumber = document.getElementById("fnSelector").value;
    console.log(fnNumber);
    const textEditor1 = document.getElementById("textEditor1");
    const text = textEditor1.value;
    console.log(text);

    let data = {};
    //data[`FN${fnNumber}Text`] = text;
    //chrome.storage.sync.set(data, function() {
        
    //});
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



document.addEventListener('DOMContentLoaded', (event) => {
    
    if (document.getElementById('textEditor1')) {
        initializeSettings();
    } else {
        initializePopup();
    }
    const versionElement = document.getElementById("versionmanifest");
    if (versionElement) {
        
        let manifest = chrome.runtime.getManifest();
        let version = manifest.version;
        versionElement.textContent += version;
    }

    const settingsButton = document.getElementById('settings');
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            window.open('settings.html', '_blank');
        });
    }
});

