document.addEventListener('DOMContentLoaded', function() {
    const langDropdown = document.getElementById("langs");
    
    chrome.storage.sync.get('selectedLanguage', function(result) {
        const lang = result.selectedLanguage || 'english';
        updateTranslations(lang);
        const options = langDropdown.options;
        for (let a = 0; a < options.length; a++) {
            if (options[a].getAttribute("language") === lang) {
                langDropdown.selectedIndex = a;
                break;
            }
        }
    });
    
    langDropdown.addEventListener("change", function() {
        const selectedOption = langDropdown.options[langDropdown.selectedIndex];
        const selectedLang = selectedOption.getAttribute("language");
        updateTranslations(selectedLang);
    });
});

function updateTranslations(lang) {
    const updateElement = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) {
            if (element.tagName === 'OPTION') {
                element.textContent = text;
            } 
            else if (element.tagName === 'BUTTON') {
                let hasUpdated = false;
                for (let i = 0; i < element.childNodes.length; i++) {
                    if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
                        element.childNodes[i].nodeValue = text;
                        hasUpdated = true;
                        break;
                    }
                }
                if (!hasUpdated) {
                    element.textContent = text;
                }
            }
            else if (element.tagName === 'SPAN' && element.parentNode.tagName === 'BUTTON') {
                element.textContent = text;
            }
            else {
                element.textContent = text;
            }
        } else {
            console.warn(`Element with selector ${selector} not found`);
        }
    };

    updateElement(".ST1", data[lang].ST1);
    updateElement(".ST2", data[lang].ST2);
    updateElement(".ST3", data[lang].ST3);
    updateElement(".ST4", data[lang].ST4);
    updateElement(".ST5", data[lang].ST5);
    updateElement(".ST6", data[lang].ST6);
    updateElement(".ST7", data[lang].ST7);
    updateElement(".ST8", data[lang].ST8);
    updateElement(".ST9", data[lang].ST9);
    updateElement(".ST10", data[lang].ST10);
    updateElement(".ST11", data[lang].ST11);
    updateElement(".ST12", data[lang].ST12);
    updateElement(".ST13", data[lang].ST13);
    updateElement(".ST14", data[lang].ST14);

    chrome.storage.sync.set({ 'selectedLanguage': lang });
}

let data = {
    english: { 
        ST1: "Settings",
        ST2: "Copy text to clipboard on exit",
        ST3: "File upload/download",
        ST4: "Download all buttons",
        ST5: "Select category",
        ST6: "Select a category first",
        ST7: "Select color",
        ST8: "Update selected button",
        ST9: "Delete selected button",
        ST10: "Scary!",
        ST11: "Create new button",
        ST12: "Language",
        ST13: "Refresh display",
        ST14: "Clear all addin data"
    },
    spanish: {
        ST1: "Configuracion",
        ST2: "Copiar texto al portapapeles al salir",
        ST3: "Subir/descargar archivo",
        ST4: "Descargar todos los botones",
        ST5: "Seleccionar categoria",
        ST6: "Primero selecciona una categoria",
        ST7: "Seleccionar color",
        ST8: "Actualizar boton seleccionado",
        ST9: "Eliminar boton seleccionado",
        ST10: "Cuidado!",
        ST11: "Crear nuevo boton",
        ST12: "Idioma",
        ST13: "Actualizar pantalla",
        ST14: "Borrar todos los datos"
    }
};