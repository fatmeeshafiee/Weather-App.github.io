
var cityInput = document.getElementById("cityInput");
var add = document.getElementById("add");
var cityoutput = document.getElementById("cityoutput");
var description = document.getElementById("description");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
const apiKey = "3045dd712ffe6e702e3245525ac7fa38";

  // Get lat و lon
async function getWeather() {
  let geoResult = await (await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&limit=1&appid=${apiKey}`
  )).json();
  if (geoResult.length === 0) {
    alert(" شهر پیدا نشد");
    return;
  }

  let lat = geoResult[0].lat;
  let lon = geoResult[0].lon;
  let weatherResult = await (await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fa`
  )).json();
  info(weatherResult);
}
add.addEventListener("click", getWeather);


function info(data) {
  let cityname = data.name;
  let descriptionData = data.weather[0].description;
  let tempData = data.main.temp;
  let windData = data.wind.speed;

  cityoutput.innerHTML = "شهر: " + cityname;
  description.innerHTML = "وضعیت: " + descriptionData;
  temp.innerHTML = `دما: ${tempData}°C`;
  wind.innerHTML = "باد: " + windData + " m/s";
}
