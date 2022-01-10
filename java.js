const api = { //api para llamar
  key: "88cc9ed180dc1e87e8a206220b12274d",
  base: "https://api.openweathermap.org/data/2.5/"

}
//constante para cambiar el fondo de pantalla
const body = document.getElementById('body');

//seleccionando el imput para buscar

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

//funcion para guadar lo que escribimos en el imput
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}
//llamada a la api
function getResults(query) {
  axios(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      changeWallpapers(query);
      return weather.data;

    }).then(displayResults);
}
//funcion utilizando fetch
/*function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}*/

function displayResults(weather) { //agregando los resultados
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name},  ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;


}

function dateBuilder(d) {
  let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiember", "Octubre", "Noviembre", "Diciembre"];
  let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
///funcion para cambiar los fondos segun la temperatura
function changeWallpapers(query) {
  axios(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      const temp_change = (Math.round(weather.data.main.temp)); //
      console.log(temp_change); //
      ////cambio de fondo//
      if (temp_change < 15) {
        body.style.backgroundImage = "url(img/fondo2.jpg)";
      }
      if (temp_change <= 24 && temp_change >= 15) {
        console.log("va por el camino")
        body.style.backgroundImage = "url(img/fondo.png)";
        body.style.backgroundSize = "auto";
      }
      if (temp_change >= 25) {
        body.style.backgroundImage = "url(img/fondohot4.jpg)";
        body.style.backgroundSize = "auto";
      } 

    })
}