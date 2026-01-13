
function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 99) return "⛈️";
  return "🌤️";
}


const button = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const input = document.getElementById("cityInput");
const result = document.getElementById("result");
const forecastDiv = document.getElementById("forecast");

// Função principal reutilizável
async function buscarClima(latitude, longitude, cityName = "") {
  try {
    result.innerText = "Buscando clima...";
    forecastDiv.innerHTML = "";

const weatherResponse = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
);


    const weatherData = await weatherResponse.json();

    const temperature = weatherData.current_weather.temperature;

    result.innerText = `🌡️ ${cityName || "Sua localização"}: ${temperature}°C`;

    forecastDiv.innerHTML = "<h3>Próximos dias</h3>";

const days = weatherData.daily.time;
const maxTemps = weatherData.daily.temperature_2m_max;
const minTemps = weatherData.daily.temperature_2m_min;
const codes = weatherData.daily.weathercode;


for (let i = 1; i <= 3; i++) {
  const date = new Date(days[i]);
  const weekDay = date.toLocaleDateString("pt-BR", {
    weekday: "short",
  });

  const icon = getWeatherIcon(codes[i]);

  forecastDiv.innerHTML += `
    <div class="forecast-day">
      <div class="day">${weekDay}</div>
      <div class="icon">${icon}</div>
      <div class="temp">${Math.round(maxTemps[i])}°</div>
      <div class="min">mín ${Math.round(minTemps[i])}°</div>
    </div>
  `;
}


  } catch (error) {
    result.innerText = "Erro ao buscar o clima.";
  }
}

// Buscar por nome da cidade
async function buscarClimaPorCidade() {
  const city = input.value.trim();

  if (!city) {
    result.innerText = "Digite o nome de uma cidade.";
    return;
  }

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      result.innerText = "Cidade não encontrada.";
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];
    buscarClima(latitude, longitude, name);

  } catch (error) {
    result.innerText = "Erro ao buscar a cidade.";
  }
}

// Buscar por localização
function buscarClimaPorLocalizacao() {
  if (!navigator.geolocation) {
    result.innerText = "Geolocalização não suportada.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      buscarClima(latitude, longitude);
    },
    () => {
      result.innerText = "Permissão de localização negada.";
    }
  );
}

// Eventos
button.addEventListener("click", buscarClimaPorCidade);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    buscarClimaPorCidade();
  }
});

locationBtn.addEventListener("click", buscarClimaPorLocalizacao);
