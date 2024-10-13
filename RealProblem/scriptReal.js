const API_KEY = 'd45f25c01beedc2bf746b3a0ce9878f9';
let temperaturaActual = null; // Variable para almacenar la temperatura actual
let unidadTemperatura = 'C';

document.getElementById('buscarBtn').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadInput').value;
    obtenerClima(ciudad);
});
window.onload = () => {
    document.getElementById('ciudadInput').value = 'Mykonos'; // Establecer Mykonos como ciudad predeterminada
    obtenerClima('Mykonos'); // Llamar a la función para cargar el clima de Mykonos
};
document.getElementById('celsiusBtn').addEventListener('click', () => {
    unidadTemperatura = 'C';
    mostrarClimaTemperatura(); // Mostrar la temperatura en Celsius
});

document.getElementById('fahrenheitBtn').addEventListener('click', () => {
    unidadTemperatura = 'F';
    mostrarClimaTemperatura(); // Mostrar la temperatura en Fahrenheit
});

function obtenerClima(ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del clima');
            }
            return response.json();
        })
        .then(data => {
            mostrarClima(data);
        })
        .catch(error => {
            document.getElementById('resultado').innerText = error.message;
        });
}
// Evento para obtener la ubicación actual
document.getElementById('currentLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            obtenerClimaPorCoordenadas(latitude, longitude);
        }, error => {
            console.error(error);
            alert('No se pudo obtener tu ubicación. Asegúrate de que la geolocalización esté habilitada.');
        });
    } else {
        alert('La geolocalización no está soportada en este navegador.');
    }
});

function obtenerClimaPorCoordenadas(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del clima');
            }
            return response.json();
        })
        .then(data => {
            mostrarClima(data);
        })
        .catch(error => {
            document.getElementById('resultado').innerText = error.message;
        });
}
function mostrarClima(data) {
    const { name, sys, main, wind, weather } = data;

    // Almacenar la temperatura actual
    temperaturaActual = main.temp; // Almacena la temperatura en Celsius

    // Formatear la fecha
    const fecha = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const resultado = `
        <h2>${name}, ${sys.country}</h2>
        <p>Fecha: ${fecha}</p>
        <p id="tempDisplay">Temperatura: ${Math.round(temperaturaActual)}°C</p>
        <p>Siente como: ${Math.round(main.feels_like)}°C</p>
        <p>Mín: ${Math.round(main.temp_min)}°C | Máx: ${Math.round(main.temp_max)}°C</p>
        <p>Descripción: ${weather[0].description}</p>
        <p>Humedad: ${main.humidity}%</p>
        <p>Viento: ${wind.speed} m/s, Dirección: ${wind.deg}°</p>
        <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
    `;
    document.getElementById('resultado').innerHTML = resultado;

    // Mostrar la temperatura en la unidad seleccionada
    mostrarClimaTemperatura();
}

function mostrarClimaTemperatura() {
    const tempDisplay = document.getElementById('tempDisplay');
    if (unidadTemperatura === 'C') {
        tempDisplay.innerText = `Temperatura: ${Math.round(temperaturaActual)}°C`;
    } else {
        const fahrenheit = (temperaturaActual * 9/5) + 32;
        tempDisplay.innerText = `Temperatura: ${Math.round(fahrenheit)}°F`;
    }
}
