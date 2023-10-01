// let caracteresPermitidos = ".:-_,;`=¿+-/*1!¡\\'\"$%&()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let caracteresPermitidos = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789.";

function rotarTexto(texto, cantidad) {
    let caracteres = texto.split("");
    for (let i = 0; i < cantidad; i++) {
        caracteres.unshift(caracteres.pop());
    }
    return caracteres.join("");
}

function rotarTextoInverso(texto, cantidad) {
    let longitud = texto.length;
    let textoRotado = [];
    for (let i = 0; i < longitud; i++) {
        let posicion = (i + cantidad) % longitud;
        textoRotado.push(texto[posicion]);
    }
    return textoRotado.join("");
}

function calcularResto(palabra1, palabra2) {
    let long1 = palabra1.length;
    let long2 = palabra2.length;
    let numCrypt = parseInt(Math.abs(Math.sin(long1 + long2)) * 100);

    if (long2 == 0) return numCrypt;
    if (long1 == long2) return long1 + numCrypt;
    if (long1 < long2) return (long2 % long1) + numCrypt;

    let resto = long1 % long2;
    return (resto == 0 ? (Math.max(long1, long2) + numCrypt) : resto + numCrypt);
}

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
    document.querySelector('#encriptar .copiar').classList.remove("visible");

    let palabraInput = document.getElementById("palabraEncriptar").value.trim();
    let palabraInputRepite = document.getElementById("palabraEncriptarRepite").value.trim();

    let claveInput = document.getElementById("claveEncriptar").value.trim();
    let claveInputRepite = document.getElementById("claveEncriptarRepite").value.trim();

    if (palabraInput.length > 0 && palabraInputRepite.length > 0 && claveInput.length && claveInputRepite.length) {
        if (palabraInput != palabraInputRepite) {
            document.querySelector('#resultadoEncriptar').innerHTML = '<span style="color: #ff9696; font-size: 16px;">El texto a encriptar no coincide</span>';

        } else if (claveInput != claveInputRepite) {
            document.querySelector('#resultadoEncriptar').innerHTML = '<span style="color: #ff9696; font-size: 16px;">La clave no coincide</span>';

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
            let cantidad = calcularResto(palabraInput, claveInput);
            resultado = rotarTexto(resultado, cantidad);   

            document.querySelector('#resultadoEncriptar').innerHTML = resultado;
            document.querySelector('#encriptar .copiar').classList.add("visible");
        }

    } else {
        document.querySelector('#resultadoEncriptar').innerHTML = '<span style="color: #ff9696; font-size: 16px;">Hay inputs vacíos</span>';
    }
}

function desencriptar() {
    document.querySelector('#desencriptar .copiar').classList.remove("visible");

    let palabraEncriptada = document.getElementById("palabraDesencriptar").value.trim();
    let palabraEncriptadaRepite = document.getElementById("palabraDesencriptarRepite").value.trim();

    let claveInput = document.getElementById("claveDesencriptar").value.trim();
    let claveInputRepite = document.getElementById("claveDesencriptarRepite").value.trim();

    if (palabraEncriptada.length > 0 && palabraEncriptadaRepite.length > 0 && claveInput.length && claveInputRepite.length) {
        if (palabraEncriptada != palabraEncriptadaRepite) {
            document.querySelector('#resultadoDesencriptar').innerHTML = '<span style="color: #ff9696; font-size: 16px;">El texto encriptado no coincide</span>';

        } else if (claveInput != claveInputRepite) {
            document.querySelector('#resultadoDesencriptar').innerHTML = '<span style="color: #ff9696; font-size: 16px;">La clave no coincide</span>';

        } else if (palabraEncriptada == palabraEncriptadaRepite && claveInput == claveInputRepite) {
            let cantidad = calcularResto(palabraEncriptada, claveInput);
            palabraEncriptada = rotarTextoInverso(palabraEncriptada, cantidad); 

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
            document.querySelector('#desencriptar .copiar').classList.add("visible");
        }

    } else {
        document.querySelector('#resultadoDesencriptar').innerHTML = '<span style="color: #ff9696; font-size: 16px;">Hay inputs vacíos</span>';
    }
}

function copiarTexto(id, event) {
    let input = document.getElementById(id);
    let text = input.innerHTML;
    navigator.clipboard.writeText(text);

    let target = event.currentTarget;
    target.classList.add("activo");
    setTimeout(() => target.classList.remove("activo"), 1000);
}