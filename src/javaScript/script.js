let searchBtn = document.querySelector(".search-button");
let input = document.querySelector("input");
let temp = document.querySelector(".temp");
let cityName = document.querySelector(".city");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let image = document.querySelector(".image");

searchBtn.addEventListener("click", function () {
  let cityNameUser = input.value;
  getWeather(cityNameUser);
});

let apiKey = "&appid=67ec3e24f477d9816e05a93cd9f76be8";
let apiLocation = "http://api.openweathermap.org/geo/1.0/direct?q=";
let apiData = "https://api.openweathermap.org/data/2.5/weather?";
let apiUnits = "&units=metric";

async function getCityName(city) {
  let cityNameAPI = await fetch(`${apiLocation}${city}${apiKey}`);
  let userCity = await cityNameAPI.json();
  let userCityCordinates = `lat=${userCity[0].lat}&lon=${userCity[0].lon}`;
  cityName.innerHTML = input.value;
  return userCityCordinates;
}
async function getWeather(data) {
  let userCordiante = await getCityName(data);
  let cityWeatherAPI = await fetch(
    `${apiData}${userCordiante}${apiKey}${apiUnits}`
  );
  let cityWeather = await cityWeatherAPI.json();
  console.log(cityWeather);
  let weatherState = await cityWeather.weather;
  let weatherMode = await weatherState[0].main.toLowerCase();
  temp.innerHTML = `${Math.floor(cityWeather.main.temp)} °C`;
  humidity.innerHTML = `${cityWeather.main.humidity}%`;
  wind.innerHTML = `${Math.floor(cityWeather.wind.speed)} km / h`;
  console.log(weatherState, typeof weatherMode);
  image.src = `../images/${weatherMode}.png`;
}
