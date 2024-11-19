const apiKey = "fe1f7aa9dda2744b49dfe34b3fb4b4ca";
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const cityNameElement = document.getElementById("city-name");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");

searchButton.addEventListener("click", () => {
    const cityName = cityInput.value;
    if (cityName) {
        getWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found.");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const { temp, humidity } = main;
    const { description } = weather[0];
    const { speed } = wind;

    cityNameElement.textContent = name;
    temperatureElement.textContent = Math.round(temp);
    descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    humidityElement.textContent = humidity;
    windSpeedElement.textContent = speed;

    weatherInfo.style.display = "block";
}

// Feedback Form Submission
const feedbackForm = document.getElementById("feedbackForm");
const feedbackSuccessMessage = document.getElementById("feedback-success");

feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Get user feedback data
    const name = document.getElementById("feedback-name").value;
    const message = document.getElementById("feedback-message").value;

    // Display success message
    feedbackSuccessMessage.style.display = "block";

    // Clear form fields
    feedbackForm.reset();

    // Optionally, you can save feedback to a server or database if needed
    console.log("Feedback submitted:", { name, message });
});
