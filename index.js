const weatherButton = document.getElementById('getWeather');
const getLocation = document.getElementById('location');
const weatherInfo = document.getElementById('weatherInfo');
const toggleUnit = document.getElementById('toggleUnit');
const error = document.getElementById('error');



function showError(message) {
    console.log(message)
    error.textContent = message;
    error.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}


function displayWeatherData(data) {
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}&deg;${toggleUnit.value === 'metric' ? 'C' : 'F'}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;

    weatherInfo.classList.remove('hidden');
    error.classList.add('hidden');
}


function fetchWeatherData(location, unit) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=e4fac35c5b0fb38172c0fb95c6867963`;


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            showError("Location not found. Please check your input.");
        });
}


weatherButton.addEventListener('click', function() {
    const location = getLocation.value.trim();
    const unit = toggleUnit.value;

    if (location === '') {
        showError("Please enter a location.");
        return;
    }

    fetchWeatherData(location, unit);
});