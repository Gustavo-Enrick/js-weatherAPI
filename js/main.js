//Variáveis
const apiKey = "1efd4a2f63c1b2d2308d08c0a5d8aada";
const apiCountryURL ="https://flagsapi.com/";
const countryFlatFlag = "/flat/32.png";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search");

const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temperature");
const descElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon");
const countrIconyElement = document.getElementById("country");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const weatherContainer = document.querySelector("#weather-data");

//Funções
const getWeatherData = async (city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
}
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = parseInt(data.main.temp);
    descElement.innerHTML = data.weather[0].description;
    weatherIconElement.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    countrIconyElement.setAttribute("src", apiCountryURL + data.sys.country + countryFlatFlag);
    humidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${parseInt(data.wind.speed)} km/h`;
    weatherContainer.removeAttribute("hidden");
    console.log(data);
}

//Eventos
searchBtn.addEventListener("click",(e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup",(e) =>{
    e.preventDefault();
    if(e.code === "Enter"){
        const city = cityInput.value;
        showWeatherData(city);
    }
});