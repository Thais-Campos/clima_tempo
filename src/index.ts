import { showWeather } from "./services/weatherService";


const city = process.argv[2];

if (!city) {
  console.log("Por favor, informe o nome da cidade.");
  process.exit(1);
}

showWeather(city).catch(error => {
  console.error("Erro:", error.message);
});

