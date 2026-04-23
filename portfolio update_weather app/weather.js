const weatherOutput = document.getElementById("weather-output");

function clearWeather() {
    weatherOutput.innerHTML = "<p>Loading...</p>";
}

async function loadWeather(cityName, latitude, longitude) {
    clearWeather();

    try {
        const url =
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&current=temperature_2m,wind_speed_10m";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        const data = await response.json();

        const temperature = data.current.temperature_2m;
        const windSpeed = data.current.wind_speed_10m;

        weatherOutput.innerHTML = `
            <h3>${cityName}</h3>
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
        `;
    } catch (error) {
        weatherOutput.innerHTML = `<p>Error loading weather data.</p>`;
    }
}