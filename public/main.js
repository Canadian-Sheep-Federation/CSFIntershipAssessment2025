// Utility: Weather code to description
function getWeatherDescription(code) {
    const codes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        80: "Rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers"
    };
    return codes[code] || "Unknown";
}

// Fetch and display all logs
async function loadLogs() {
    const res = await fetch('/grazing');
    const logs = await res.json();
    const logsDiv = document.getElementById('logs');
    logsDiv.innerHTML = '';
    logs.forEach(log => {
        logsDiv.innerHTML += `
      <div class="log">
        <strong>Date:</strong> ${log.date ? log.date.substring(0, 10) : ''}<br>
        <strong>Paddock:</strong> ${log.paddock}<br>
        <strong>Sheep Count:</strong> ${log.sheep_count}<br>
        <strong>Notes:</strong> ${log.notes}<br>
        <strong>Weather:</strong> ${log.weather ? `
          Temp: ${log.weather.temperature ?? ''}°C, 
          Windspeed: ${log.weather.windspeed ?? ''} km/h, 
          Precip: ${log.weather.precipitation ?? ''} mm, 
          Code: ${log.weather.weathercode ?? ''}, 
          Desc: ${log.weather.description ?? ''}` : 'N/A'}
      </div>
    `;
    });
}

// Handle form submission
document.getElementById('grazingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        date: form.date.value,
        paddock: form.paddock.value,
        sheep_count: Number(form.sheep_count.value),
        notes: form.notes.value,
        weather: {
            temperature: form.temperature.value ? Number(form.temperature.value) : undefined,
            windspeed: form.windspeed.value ? Number(form.windspeed.value) : undefined,
            weathercode: form.weathercode.value ? Number(form.weathercode.value) : undefined,
            description: form.description.value,
            precipitation: form.precipitation.value ? Number(form.precipitation.value) : undefined
        }
    };
    // Remove empty weather fields
    if (
        !data.weather.temperature &&
        !data.weather.windspeed &&
        !data.weather.weathercode &&
        !data.weather.description &&
        !data.weather.precipitation
    ) {
        delete data.weather;
    }
    await fetch('/grazing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    form.reset();
    loadLogs();
});

// Use browser's location to fill latitude and longitude
document.getElementById('useLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById('latitude').value = position.coords.latitude;
            document.getElementById('longitude').value = position.coords.longitude;
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

// Get weather for user-specified coordinates and display all relevant fields
document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    if (!latitude || !longitude) {
        alert('Please enter latitude and longitude.');
        return;
    }
    // Request precipitation for the current hour
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation`;

    const weatherDiv = document.getElementById('weatherResult');
    weatherDiv.textContent = 'Loading...';

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.current_weather) {
            // Find precipitation for the current hour if available
            let precipitation = '';
            if (data.hourly && data.hourly.time && data.hourly.precipitation) {
                const currentHourIndex = data.hourly.time.indexOf(data.current_weather.time);
                if (currentHourIndex !== -1) {
                    precipitation = data.hourly.precipitation[currentHourIndex];
                }
            }
            const description = getWeatherDescription(data.current_weather.weathercode);
            weatherDiv.innerHTML = `
                <strong>Temperature:</strong> ${data.current_weather.temperature}°C<br>
                <strong>Windspeed:</strong> ${data.current_weather.windspeed} km/h<br>
                <strong>Weather Code:</strong> ${data.current_weather.weathercode}<br>
                <strong>Description:</strong> ${description}<br>
                <strong>Precipitation:</strong> ${precipitation} mm
            `;
        } else {
            weatherDiv.textContent = 'Weather data not available.';
        }
    } catch (err) {
        weatherDiv.textContent = 'Error fetching weather.';
    }
});

// Initial load
loadLogs();