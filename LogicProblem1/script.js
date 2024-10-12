function decode(str) {
    const stack = [];
    let currentString = '';

    for (let char of str) {
        if (char === '(') {
            stack.push(currentString);  //Agrega la cadena actual currentString al stack.
            currentString = '';
        } else if (char === ')') {
            currentString = currentString.split('').reverse().join(''); //Invierte la cadena actual
            currentString = stack.pop() + currentString; //Saca la última cadena almacenada en el stack y la concatena con la cadena invertida.
        } else {
            currentString += char;
        }
    }

    return currentString;
}
document.getElementById('decodeButton').addEventListener('click', () => {
    const input = document.getElementById('inputString').value;
    const output = decode(input);
    const resultDiv = document.getElementById('result');

    if (output) {
        resultDiv.textContent = output;
    } else {
        resultDiv.textContent = ''; // Limpia el texto si no hay salida
    }
});

// Inicializa el texto en el div de resultado
document.getElementById('result').textContent = 'resultado';
