function getIndexsForPalindrome(word) {
    const len = word.length;

    // Recorremos todos los posibles intercambios
    for (let a = 0; a < len; a++) {
        for (let b = 0; b < len; b++) {
            // Creamos una copia del arreglo original
            let swapped = [...word];
            
            // Intercambiamos las posiciones a y b
            let aux = swapped[a];
            swapped[a] = swapped[b];
            swapped[b] = aux;

            // Verificamos si el nuevo arreglo es un palíndromo
            let left = swapped.slice(0, Math.floor(len / 2)).join("");
            let right = swapped.slice(Math.ceil(len / 2)).reverse().join("");

            // Comparamos las mitades
            if (left === right) {
                // Si a y b son iguales, no hay cambio
                if (a === b) {
                    return [];
                }
                return [a, b]; // Retorna los índices que se intercambiaron
            }
        }
    }

    // Si no se pudo formar un palíndromo
    return null;
}


// Manejo del evento del botón
document.getElementById('checkPalindromeButton').addEventListener('click', () => {
    const input = document.getElementById('inputString').value;
    const resultDiv = document.getElementById('result');
    const result = getIndexsForPalindrome(input);

    if (result === null) {
        resultDiv.textContent = "No se puede formar un palíndromo.";
    } else if (result.length === 0) {
        resultDiv.textContent = "Ya es un palíndromo.";
    } else {
        resultDiv.textContent = `Intercambiar índices: ${result[0]} y ${result[1]}`;
    }
});



