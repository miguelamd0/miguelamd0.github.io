
//document.addEventListener("DOMContentLoaded", function () {
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
        let claveInput = document.getElementById("claveEncriptar").value.trim();
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

    function desencriptar() {
        let palabraEncriptada = document.getElementById("palabraDesencriptar").value.trim();
        let clave = document.getElementById("claveDesencriptar").value.trim();
        let tablaConversion = generarTablaConversion(clave);
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
//});