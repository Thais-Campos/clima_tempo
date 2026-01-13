"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showWeather = showWeather;
const openMeteo_1 = require("../api/openMeteo");
async function showWeather(city) {
    const location = await (0, openMeteo_1.getCoordinates)(city);
    const temperature = await (0, openMeteo_1.getWeather)(location.latitude, location.longitude);
    console.log(`Clima em ${location.name}`);
    console.log(`Temperatura atual: ${temperature}°C`);
}
