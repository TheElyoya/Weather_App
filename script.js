//https://api.openweathermap.org/data/2.5/weather?q=casablanca&appid=eb9aafecfa512a40b80ad28b700429d4&units=metric
const weather = {
  apiKey: "eb9aafecfa512a40b80ad28b700429d4",
  async fetchData(cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`
      );
      const data = await response.json();
      this.displayData(data);
    } catch (error) {
      console.log("Error Fetching Data From Api : ", error);
    }
  },
  displayData: function (data) {
    let { name } = data;
    let { temp, humidity } = data.main;
    let { description, icon } = data.weather[0];
    let { speed } = data.wind;
    document.querySelector(".city").innerHTML = `Weather In ${name}`;
    document.querySelector(".temp").innerHTML = `${temp}°C `;
    document.querySelector(".description").innerHTML = `${description}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".humidity").innerHTML = `Humidity : ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind Speed : ${speed} km/h`;
    document.querySelector(".temp").classList.remove("loading");
    document.querySelector(".wheater").classList.remove("loading");
    document.querySelector(".card").classList.remove("loading");
    document.body.style.backgroundImage = `url("https://source.unsplash.com/random/?landscape/${name}")`;
  },
  search: function () {
    let city = document.querySelector(".search-bar").value;
    this.fetchData(city);
  },
};
// Load weather data for default city when first loaded

weather.fetchData("el jadida");

document.getElementById("search-button").addEventListener("click", function () {
  weather.search();
});
// Add event listeners for search button and search bar
document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    weather.search();
  }
});
