const button = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  const city = input.value.trim();

  if (!city) {
    result.innerText = "Digite o nome de uma cidade.";
    return;
  }

  try {
    result.innerText = "Buscando clima...";

    // 1️⃣ Buscar coordenadas
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const geoData = await geoResponse.json();

    if (!geoData.results) {
      result.innerText = "Cidade não encontrada.";
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // 2️⃣ Buscar clima
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    const weatherData = await weatherResponse.json();
    const temperature = weatherData.current_weather.temperature;

    result.innerText = `🌡️ ${name}: ${temperature}°C`;
  } catch (error) {
    result.innerText = "Erro ao buscar o clima.";
  }
});
