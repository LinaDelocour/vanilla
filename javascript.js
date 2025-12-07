function refresh(response){
  cityElement=document.querySelector("#current-city");
  cityElement.innerHTML=response.data.city;
  
  let temperatureElement=document.querySelector("#current-temperature-value");
  let temperature=response.data.temperature.current;
  temperatureElement.innerHTML=Math.round(temperature);

  let condition=document.querySelector("#condition");
  condition.innerHTML=response.data.condition.description;

  let humidity=document.querySelector("#humidity");
  humidity.innerHTML=response.data.temperature.humidity;

  let wind=document.querySelector("#wind");
  let speed=`${response.data.wind.speed}km/h`;
  wind.innerHTML=speed;

  let icon=document.querySelector("#icon");
  let iconUrl=`<img src="${response.data.condition.icon_url}">`;
  icon.innerHTML=iconUrl;

  getForecast(response.data.city);
}

function api(city){
  let apiKey = "ae3a312323bto5f9e8049a27984bd0d3";
  let apiURL=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refresh);
}
function title(event){
  event.preventDefault();
  let search = document.querySelector("#search-input");
  api(search.value);
}
function date(dates){
  let minutes = dates.getMinutes();
  let hours = dates.getHours();
  let day = dates.getDay();

  if (hours < 10) {
    hours = `0${hours}`;
  };
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let newDay = days[day];
  return `${newDay} ${hours}:${minutes}`;
};

let now = new Date();
let formatDate = document.querySelector("#current-date");
formatDate.innerHTML = date(now);

let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit", title);

function formatDay(timestamp){
  day=new Date(timestamp*1000);
  days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day.getDay()];
}

function getForecast(city){
  apiKey = `ae3a312323bto5f9e8049a27984bd0d3`;
  apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiURL).then(weatherForecast);
}

function weatherForecast(response){
  let forecastElement="";
  response.data.daily.forEach(function (day, index){
    if (index<6 && index>0){
      forecastElement =
        forecastElement +
        `<div class="weather-forecast-days">
        <div class="weather-forecast-day">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong> ${Math.round(day.temperature.maximum)}° </strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div>`;
    }
  });
  let forecast = document.querySelector("#weather-forecast");
  forecast.innerHTML=forecastElement;
}
