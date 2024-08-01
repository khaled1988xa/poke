document.addEventListener('DOMContentLoaded', () => {
    const citynameInput = document.getElementById('citynameInput');
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    const weatherCard = document.getElementById('weatherCard');
    const cityNameElem = document.getElementById('cityName');
    const countryElem = document.getElementById('country');
    const temperatureElem = document.getElementById('temperature');
    const weatherDescriptionElem = document.getElementById('weatherDescription');
    const weatherIconElem = document.getElementById('weatherIcon');
    const moreDetailsBtn = document.getElementById('moreDetailsBtn');
  
    const API_KEY = '01c3c2368afd7192bc522d6b354bc61d';
  
    const weatherCodes = {
      200: { main: "Thunderstorm", description: "thunderstorm with light rain", icon: "11d" },
      201: { main: "Thunderstorm", description: "thunderstorm with rain", icon: "11d" },
      202: { main: "Thunderstorm", description: "thunderstorm with heavy rain", icon: "11d" },
      210: { main: "Thunderstorm", description: "light thunderstorm", icon: "11d" },
      211: { main: "Thunderstorm", description: "thunderstorm", icon: "11d" },
      212: { main: "Thunderstorm", description: "heavy thunderstorm", icon: "11d" },
      221: { main: "Thunderstorm", description: "ragged thunderstorm", icon: "11d" },
      230: { main: "Thunderstorm", description: "thunderstorm with light drizzle", icon: "11d" },
      231: { main: "Thunderstorm", description: "thunderstorm with drizzle", icon: "11d" },
      232: { main: "Thunderstorm", description: "thunderstorm with heavy drizzle", icon: "11d" },
      300: { main: "Drizzle", description: "light intensity drizzle", icon: "09d" },
      301: { main: "Drizzle", description: "drizzle", icon: "09d" },
      302: { main: "Drizzle", description: "heavy intensity drizzle", icon: "09d" },
      310: { main: "Drizzle", description: "light intensity drizzle rain", icon: "09d" },
      311: { main: "Drizzle", description: "drizzle rain", icon: "09d" },
      312: { main: "Drizzle", description: "heavy intensity drizzle rain", icon: "09d" },
      313: { main: "Drizzle", description: "shower rain and drizzle", icon: "09d" },
      314: { main: "Drizzle", description: "heavy shower rain and drizzle", icon: "09d" },
      321: { main: "Drizzle", description: "shower drizzle", icon: "09d" },
      500: { main: "Rain", description: "light rain", icon: "10d" },
      501: { main: "Rain", description: "moderate rain", icon: "10d" },
      502: { main: "Rain", description: "heavy intensity rain", icon: "10d" },
      503: { main: "Rain", description: "very heavy rain", icon: "10d" },
      504: { main: "Rain", description: "extreme rain", icon: "10d" },
      511: { main: "Rain", description: "freezing rain", icon: "13d" },
      520: { main: "Rain", description: "light intensity shower rain", icon: "09d" },
      521: { main: "Rain", description: "shower rain", icon: "09d" },
      522: { main: "Rain", description: "heavy intensity shower rain", icon: "09d" },
      531: { main: "Rain", description: "ragged shower rain", icon: "09d" },
      600: { main: "Snow", description: "light snow", icon: "13d" },
      601: { main: "Snow", description: "snow", icon: "13d" },
      602: { main: "Snow", description: "heavy snow", icon: "13d" },
      611: { main: "Snow", description: "sleet", icon: "13d" },
      612: { main: "Snow", description: "light shower sleet", icon: "13d" },
      613: { main: "Snow", description: "shower sleet", icon: "13d" },
      615: { main: "Snow", description: "light rain and snow", icon: "13d" },
      616: { main: "Snow", description: "rain and snow", icon: "13d" },
      620: { main: "Snow", description: "light shower snow", icon: "13d" },
      621: { main: "Snow", description: "shower snow", icon: "13d" },
      622: { main: "Snow", description: "heavy shower snow", icon: "13d" },
      701: { main: "Mist", description: "mist", icon: "50d" },
      711: { main: "Smoke", description: "smoke", icon: "50d" },
      721: { main: "Haze", description: "haze", icon: "50d" },
      731: { main: "Dust", description: "sand/dust whirls", icon: "50d" },
      741: { main: "Fog", description: "fog", icon: "50d" },
      751: { main: "Sand", description: "sand", icon: "50d" },
      761: { main: "Dust", description: "dust", icon: "50d" },
      762: { main: "Ash", description: "volcanic ash", icon: "50d" },
      771: { main: "Squall", description: "squalls", icon: "50d" },
      781: { main: "Tornado", description: "tornado", icon: "50d" },
      800: { main: "Clear", description: "clear sky", icon: "01d" },
      801: { main: "Clouds", description: "few clouds: 11-25%", icon: "02d" },
      802: { main: "Clouds", description: "scattered clouds: 25-50%", icon: "03d" },
      803: { main: "Clouds", description: "broken clouds: 51-84%", icon: "04d" },
      804: { main: "Clouds", description: "overcast clouds: 85-100%", icon: "04d" }
    };
  
    async function getCityCoordinates() {
      const city = citynameInput.value;
      try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const cityObject = {
            lat: data[0].lat,
            lon: data[0].lon,
            country: data[0].country,
            cityname: data[0].name
          };
          fetchWeatherData(cityObject);
        } else {
          alert('City not found');
        }
      } catch (error) {
        console.error('Error fetching city coordinates:', error);
      }
    }
  
    async function fetchWeatherData(cityObject) {
      try {
        const { lat, lon } = cityObject;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json();
        if (data) {
          const weatherDescription = data.weather[0].description;
          const weatherIconId = data.weather[0].id;
          const temp = data.main.temp;
          const temperature = Math.ceil((temp - 273.15) * 10) / 10;
          cityNameElem.textContent = cityObject.cityname;
          countryElem.textContent = cityObject.country;
          temperatureElem.textContent = temperature;
          weatherDescriptionElem.textContent = weatherDescription;
          weatherIconElem.src = getWeatherIcon(weatherIconId);
        } else {
          alert('Weather data not found');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  
    function getWeatherIcon(code) {
      if (code == 800) {
        return 'src/assets/sunny.png';
      } else if (code >= 801 && code <= 804) {
        return 'src/assets/cloud.png';
      } else if (code >= 701 && code <= 781) {
        return 'src/assets/mist.png';
      } else if (code >= 600 && code <= 622) {
        return 'src/assets/snow.png';
      } else if ((code >= 500 && code <= 504) || (code >= 520 && code <= 531)) {
        return 'src/assets/rain.png';
      } else if (code === 511) {
        return 'src/assets/snow.png';
      } else if (code >= 300 && code <= 321) {
        return 'src/assets/rain.png';
      } else if (code >= 200 && code <= 232) {
        return 'src/assets/rain+lightning.png';
      } else {
        return 'null';
      }
    }
  
    fetchWeatherBtn.addEventListener('click', getCityCoordinates);
  });
  