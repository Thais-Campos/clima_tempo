import { getCoordinates, getWeather } from "../api/openMeteo";

export async function showWeather(city: string) {
  const location = await getCoordinates(city);

  const temperature = await getWeather(
    location.latitude,
    location.longitude
  );

  console.log(`Clima em ${location.name}`);
  console.log(`Temperatura atual: ${temperature}°C`);
}
