const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const cityName = document.getElementById('city-name');
const countryFlag = document.querySelector('.country-flag');
const currentDate = document.getElementById('current-date');

async function checkWeather(city) {
    const api_key = "13e4a1cdd4eba195d43eb060050a77f8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex"; 

    cityName.innerHTML = `${weather_data.name}, ${weather_data.sys.country}`;
    
    const countryCode = weather_data.sys.country.toLowerCase();
    countryFlag.src = `https://flagcdn.com/w80/${countryCode}.png`;
    countryFlag.style.display = "block";

    // 2. Update Date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    currentDate.innerText = new Date().toLocaleDateString('en-US', options);

    // 3. Update Weather Stats
    temperature.innerHTML = `${Math.round(weather_data.main.temp)}°`;
    description.innerHTML = weather_data.weather[0].description;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    // 4. Fix Image Path: Ensuring "Clouds" maps to "cloud.png" to avoid 404
    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;
        default:
            weather_img.src = "assets/cloud.png";
    }

    console.log(weather_data);
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});