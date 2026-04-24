const cityText = document.getElementById("city");
const temperatureText = document.getElementById("temperature");
const windText = document.getElementById("wind");
const timeText = document.getElementById("time");
const output = document.getElementById("output");

function log(message) {
    output.textContent += message + "\n";
}

function clearOutput() {
    output.textContent = "";
}

document.getElementById("btnKuopio").onclick = function () {
    loadWeatherByCity("Kuopio", 62.8924, 27.6770);
};

document.getElementById("btnHelsinki").onclick = function () {
    loadWeatherByCity("Helsinki", 60.1699, 24.9384);
};

document.getElementById("btnOulu").onclick = function () {
    loadWeatherByCity("Oulu", 65.0121, 25.4651);
};

async function loadWeatherByCity(cityName, latitude, longitude) {
    clearOutput();

    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&current=temperature_2m,wind_speed_10m"
        );

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        const data = await response.json();

        console.log(data);

        const temperature = data.current.temperature_2m;
        const wind = data.current.wind_speed_10m;
        const time = data.current.time;

        cityText.textContent = cityName;
        temperatureText.textContent = temperature + " °C";
        windText.textContent = wind + " km/h";
        timeText.textContent = time;

        log("City: " + cityName);
        log("Temperature: " + temperature + " °C");
        log("Wind Speed: " + wind + " km/h");
        log("Time: " + time);

        if (temperature < 0) {
            document.body.className = "cold";
        } else {
            document.body.className = "mild";
        }

    } catch (error) {
        log("Error: " + error.message);
    }
}