import axios from "axios";

// Busca latitude e longitude a partir do nome da cidade
export async function getCoordinates(city: string) {
  const response = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: {
        name: city,
        count: 1
      }
    }
  );

  if (!response.data.results || response.data.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  const { latitude, longitude, name } = response.data.results[0];

  return { latitude, longitude, name };
}

// Busca a temperatura atual usando latitude e longitude
export async function getWeather(latitude: number, longitude: number) {
  const response = await axios.get(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        current_weather: true
      }
    }
  );

  return response.data.current_weather.temperature;
}
