function title(event){
  event.preventDefault();
  let search=document.querySelector("#search-input");
  let city=document.querySelector("#current-city");
  city.innerHTML=search.value;
}

function date(dates) {
  let minutes = dates.getMinutes();
  let hours = dates.getHours();
  let day = dates.getDay();

  if (hours < 10) {
    hours = `0${hours}`;
  }
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
}

let now = new Date();
let formatDate = document.querySelector("#current-date");
formatDate.innerHTML = date(now);

let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit", title);