//API Key 
const apiKey = "154c398e47f400515629de78b8b0ec25";

//DOM elements
const zipInput = document.getElementById("zipcode");
const submitInfo = document.getElementById("submit");
const weatherInfo = document.getElementById("weather-info");

// Function to give weather information
function giveWeatherInfo(city, date, tempHigh, tempLow, description, currentTemp) {
  // Create new DOM elements
  const heading = document.createElement("h2");
  const dateElement = document.createElement("p");
  const temperature = document.createElement("h1");
  const highTemperature = document.createElement("p");
  const lowTemperature = document.createElement("p");
  const descriptionElement = document.createElement("p");

  // Text of my new elements
  heading.textContent = 'Weather of ' + city;
  dateElement.textContent = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  temperature.textContent = `${currentTemp}°F` ;
  highTemperature.textContent = `High: ${tempHigh}\°F`;
  lowTemperature.textContent = `Low: ${tempLow}\°F`;
  descriptionElement.textContent = `Sky Conditions: ${description}`;

  // Remove any existing weather information
  while (weatherInfo.firstChild) {
    weatherInfo.removeChild(weatherInfo.firstChild);
  }

  // new elements to the weatherInfo element
  weatherInfo.appendChild(heading);
  weatherInfo.appendChild(dateElement);
  weatherInfo.appendChild(temperature);
  weatherInfo.appendChild(highTemperature);
  weatherInfo.appendChild(lowTemperature);
  weatherInfo.appendChild(descriptionElement);
}

// Define function to get weather information
function getWeatherInfo() {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.value}&appid=${apiKey}&units=imperial`;

  // Fetch weather data from the API
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const city = data.name;
      const date = new Date(data.dt * 1000).toLocaleDateString();
      const tempHigh = data.main.temp_max;
      const tempLow = data.main.temp_min;
      const description = data.weather[0].description;
      const currentTemp = data.main.temp;

      // Give weather information 
      giveWeatherInfo(city, date, tempHigh, tempLow, description, currentTemp);
    })
    .catch(function(error) {
      console.log(error);
    });
}

// Event listener to submit button
submitInfo.addEventListener("click", getWeatherInfo);
