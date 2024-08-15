// Función para encriptar el texto
function encriptar(traduccion, textareaId, errorId, areaDefaultId, areaResultId, textoSalidaId) {
    document.querySelector("#" + errorId).removeAttribute("style");
    var textarea = document.querySelector("#" + textareaId);
    const texto = textarea.value;
    var areaDefault = document.querySelector("#" + areaDefaultId);
    var areaResult = document.querySelector("#" + areaResultId);
    var textoSalida = document.querySelector("#" + textoSalidaId);

    if (texto !== "") {
        var out = "";
        for (var i = 0; i < texto.length; i++) {
            if (((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] !== ' ')) {
                document.querySelector("#" + errorId).style.color = "red";
                document.querySelector("#" + errorId).style.fontSize = "16px";
                return;
            } else if ((texto.length === 1 && texto === " ") || texto.replace(/ /g, "") === "") {
                areaDefault.classList.remove("contenedorNoVisible");
                areaResult.classList.add("contenedorNoVisible");
                return;
            }
            switch (texto[i]) {
                case 'a':
                    out += traduccion["a"];
                    break;
                case 'e':
                    out += traduccion["e"];
                    break;
                case 'i':
                    out += traduccion["i"];
                    break;
                case 'o':
                    out += traduccion["o"];
                    break;
                case 'u':
                    out += traduccion["u"];
                    break;
                default:
                    out += texto[i];
                    break;
            }
        }

        areaDefault.classList.add("contenedorNoVisible");
        areaResult.classList.remove("contenedorNoVisible");
        textoSalida.textContent = out;
    }
}

// Función para desencriptar el texto
function desencriptar(traduccion, textareaId, errorId, areaDefaultId, areaResultId, textoSalidaId) {
    document.querySelector("#" + errorId).removeAttribute("style");
    var textarea = document.querySelector("#" + textareaId);
    var texto = textarea.value;
    var areaDefault = document.querySelector("#" + areaDefaultId);
    var areaResult = document.querySelector("#" + areaResultId);
    var textoSalida = document.querySelector("#" + textoSalidaId);

    if (texto !== "") {
        for (var i = 0; i < texto.length; i++) {
            if (((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] !== ' ')) {
                document.querySelector("#" + errorId).style.color = "red";
                document.querySelector("#" + errorId).style.fontSize = "16px";
                return;
            } else if ((texto.length === 1 && texto === " ") || texto.replace(/ /g, "") === "") {
                areaDefault.classList.remove("contenedorNoVisible");
                areaResult.classList.add("contenedorNoVisible");
                return;
            }
        }

        areaDefault.classList.add("contenedorNoVisible");
        areaResult.classList.remove("contenedorNoVisible");
        for (const [key, value] of Object.entries(traduccion)) {
            texto = texto.replace(new RegExp(value, "g"), key);
        }
        textoSalida.textContent = texto;
    }
}

// Función para copiar el texto al portapapeles
function clipboard(textoSalidaId) {
    const textoSalida = document.querySelector("#" + textoSalidaId);

    // Copia el texto al portapapeles
    navigator.clipboard.writeText(textoSalida.textContent)
        .then(() => {
            // Muestra un mensaje de confirmación después de copiar
            alert("Texto copiado al portapapeles");
        })
        .catch(err => {
            console.error("Error al copiar al portapapeles:", err);
        });
}

// Objeto de traducción para encriptar y desencriptar
var traduccion = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"};

// Asignar eventos a los botones
document.querySelector('#encriptar').addEventListener('click', function() { 
    encriptar(traduccion, 'texto', 'error', 'default', 'result', 'textoSalida'); 
});
document.querySelector('#desencriptar').addEventListener('click', function() { 
    desencriptar(traduccion, 'texto', 'error', 'default', 'result', 'textoSalida'); 
});
document.querySelector('#copiar').addEventListener('click', function() { 
    clipboard('textoSalida'); 
})