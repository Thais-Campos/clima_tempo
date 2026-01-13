"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = getCoordinates;
exports.getWeather = getWeather;
const axios_1 = __importDefault(require("axios"));
// Busca latitude e longitude a partir do nome da cidade
async function getCoordinates(city) {
    const response = await axios_1.default.get("https://geocoding-api.open-meteo.com/v1/search", {
        params: {
            name: city,
            count: 1
        }
    });
    if (!response.data.results || response.data.results.length === 0) {
        throw new Error("Cidade não encontrada");
    }
    const { latitude, longitude, name } = response.data.results[0];
    return { latitude, longitude, name };
}
// Busca a temperatura atual usando latitude e longitude
async function getWeather(latitude, longitude) {
    const response = await axios_1.default.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude,
            longitude,
            current_weather: true
        }
    });
    return response.data.current_weather.temperature;
}
