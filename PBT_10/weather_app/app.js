
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const historyContainer = document.getElementById('history-container');

const stateInitial = document.getElementById('state-initial');
const stateLoading = document.getElementById('state-loading');
const stateSuccess = document.getElementById('state-success');
const stateError = document.getElementById('state-error');

const weatherCity = document.getElementById('weather-city');
const weatherCountry = document.getElementById('weather-country');
const weatherIcon = document.getElementById('weather-icon');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherWind = document.getElementById('weather-wind');
const errorMessage = document.getElementById('error-message');

const iconMapping = {
    "Sunny": '<i class="fa-solid fa-sun"></i>',
    "Clear": '<i class="fa-solid fa-sun"></i>',
    "PartlyCloudy": '<i class="fa-solid fa-cloud-sun"></i>',
    "Cloudy": '<i class="fa-solid fa-cloud"></i>',
    "Overcast": '<i class="fa-solid fa-cloud"></i>',
    "Mist": '<i class="fa-solid fa-smog"></i>',
    "Fog": '<i class="fa-solid fa-smog"></i>',
    "LightRain": '<i class="fa-solid fa-cloud-sun-rain"></i>',
    "HeavyRain": '<i class="fa-solid fa-cloud-showers-heavy"></i>',
    "ThunderyShowers": '<i class="fa-solid fa-cloud-bolt"></i>',
    "Snow": '<i class="fa-solid fa-snowflake"></i>'
};

let searchHistory = JSON.parse(localStorage.getItem('weather_history')) || [];
renderHistory();

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

// Thay đổi State bằng cách bật/tắt class 'd-none' của Bootstrap (Thay thế cho 'hidden' của Tailwind)
function switchState(state) {
    stateInitial.classList.add('d-none');
    stateLoading.classList.add('d-none');
    stateSuccess.classList.add('d-none');
    stateError.classList.add('d-none');

    if (state === 'initial') stateInitial.classList.remove('d-none');
    if (state === 'loading') stateLoading.classList.remove('d-none');
    if (state === 'success') stateSuccess.classList.remove('d-none');
    if (state === 'error') stateError.classList.remove('d-none');
}

async function fetchWeatherData(city) {
    switchState('loading');
    cityInput.value = '';

    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const currentCondition = data.current_condition[0];
        const areaInfo = data.nearest_area[0];

        const cityName = areaInfo.areaName[0].value;
        const countryName = areaInfo.country[0].value;
        const tempC = currentCondition.temp_C;
        const humidity = currentCondition.humidity;
        const windSpeed = currentCondition.windspeedKmph;
        const weatherDescValue = currentCondition.lang_vi ? currentCondition.lang_vi[0].value : currentCondition.weatherDesc[0].value;
        const weatherCode = currentCondition.weatherDesc[0].value.replace(/\s+/g, '');

        weatherCity.textContent = cityName;
        weatherCountry.textContent = countryName;
        weatherTemp.textContent = tempC;
        weatherDesc.textContent = weatherDescValue;
        weatherHumidity.textContent = `${humidity}%`;
        weatherWind.textContent = `${windSpeed} km/h`;

        weatherIcon.innerHTML = iconMapping[weatherCode] || '<i class="fa-solid fa-cloud-sun"></i>';

        switchState('success');
        saveToHistory(cityName);

    } catch (error) {
        console.error("Lỗi:", error);
        if (!navigator.onLine) {
            errorMessage.textContent = "Không có kết nối mạng. Vui lòng kiểm tra internet.";
        } else {
            errorMessage.textContent = `Không thể tìm thấy dữ liệu cho "${city}".`;
        }
        switchState('error');
    }
}

function saveToHistory(cityName) {
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== cityName.toLowerCase());
    searchHistory.unshift(cityName);

    if (searchHistory.length > 5) {
        searchHistory.pop();
    }

    localStorage.setItem('weather_history', JSON.stringify(searchHistory));
    renderHistory();
}

function renderHistory() {
    historyContainer.innerHTML = '';

    if (searchHistory.length === 0) {
        historyContainer.innerHTML = '<span class="text-muted small italic">Trống</span>';
        return;
    }

    searchHistory.forEach(city => {
        const btn = document.createElement('button');
        btn.textContent = city;
        // Áp dụng lớp Button Outline của Bootstrap để làm các tag lịch sử nhỏ gọn, tinh tế
        btn.className = "btn btn-outline-secondary btn-sm text-truncate text-capitalize";
        btn.style.maxWidth = "110px";

        btn.addEventListener('click', () => {
            fetchWeatherData(city);
        });

        historyContainer.appendChild(btn);
    });
}
