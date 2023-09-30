// let caracteresPermitidos = ".:-_,;`=¿+-/*1!¡\\'\"$%&()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generarTablaConversion(claveSecreta) {
    let clave = claveSecreta.repeat(Math.ceil(caracteresPermitidos.length / claveSecreta.length)).slice(0, caracteresPermitidos.length);
    let tablaConversion = caracteresPermitidos.split('');
    for (let i = tablaConversion.length - 1, j = 0; i > 0; i--, j++) {
        let pos = (clave.charCodeAt(j % clave.length) + j) % (i + 1);
        [tablaConversion[i], tablaConversion[pos]] = [tablaConversion[pos], tablaConversion[i]];
    }
    return tablaConversion.join('');
}

function encriptar() {
    let palabraInput = document.getElementById("palabraEncriptar").value.trim();
    let palabraInputRepite = document.getElementById("palabraEncriptarRepite").value.trim();

    let claveInput = document.getElementById("claveEncriptar").value.trim();
    let claveInputRepite = document.getElementById("claveEncriptarRepite").value.trim();

    if (palabraInput.length > 0 && palabraInputRepite.length > 0 && claveInput.length && claveInputRepite.length) {
        if (palabraInput != palabraInputRepite) {
            document.querySelector('#resultadoEncriptar').innerHTML = '<span style="color: #ff9696; font-size: 18px;">El texto a encriptar no coincide</span>';

        } else if (claveInput != claveInputRepite) {
            document.querySelector('#resultadoEncriptar').innerHTML = '<span style="color: #ff9696; font-size: 18px;">La clave no coincide</span>';

        } else if (palabraInput == palabraInputRepite && claveInput == claveInputRepite) {
            let tablaConversion = generarTablaConversion(claveInput);
            let resultado = '';
            for (let i = 0; i < palabraInput.length; i++) {
                let caracter = palabraInput.charAt(i);
                let indiceCaracter = caracteresPermitidos.indexOf(caracter);
                if (indiceCaracter === -1) {
                    resultado += caracter; // Conservar caracteres no encontrados en la tabla
                } else {
                    resultado += tablaConversion.charAt(indiceCaracter);
                }
            }
            document.querySelector('#resultadoEncriptar').innerHTML = resultado;
        }

    } else {
        document.querySelector('#resultadoEncriptar').innerHTML = '<span style="color: #ff9696; font-size: 20px;">Hay inputs vacíos</span>';
    }
}

function desencriptar() {
    let palabraEncriptada = document.getElementById("palabraDesencriptar").value.trim();
    let palabraEncriptadaRepite = document.getElementById("palabraDesencriptarRepite").value.trim();

    let claveInput = document.getElementById("claveDesencriptar").value.trim();
    let claveInputRepite = document.getElementById("claveDesencriptarRepite").value.trim();

    if (palabraEncriptada.length > 0 && palabraEncriptadaRepite.length > 0 && claveInput.length && claveInputRepite.length) {
        if (palabraEncriptada != palabraEncriptadaRepite) {
            document.querySelector('#resultadoDesencriptar').innerHTML = '<span style="color: #ff9696; font-size: 18px;">El texto encriptado no coincide</span>';

        } else if (claveInput != claveInputRepite) {
            document.querySelector('#resultadoDesencriptar').innerHTML = '<span style="color: #ff9696; font-size: 18px;">La clave no coincide</span>';

        } else if (palabraEncriptada == palabraEncriptadaRepite && claveInput == claveInputRepite) {
            let tablaConversion = generarTablaConversion(claveInput);
            let resultado = '';
            for (let i = 0; i < palabraEncriptada.length; i++) {
                let caracterEncriptado = palabraEncriptada.charAt(i);
                let indiceCaracter = tablaConversion.indexOf(caracterEncriptado);
                if (indiceCaracter === -1) {
                    resultado += caracterEncriptado; // Conservar caracteres no encontrados en la tabla
                } else {
                    resultado += caracteresPermitidos.charAt(indiceCaracter);
                }
            }
            document.querySelector('#resultadoDesencriptar').innerHTML = resultado;
        }

    } else {
        document.querySelector('#resultadoDesencriptar').innerHTML = '<span style="color: #ff9696; font-size: 18px;">Hay inputs vacíos</span>';
    }
}