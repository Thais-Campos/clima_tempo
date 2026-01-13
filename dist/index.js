"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weatherService_1 = require("./services/weatherService");
const city = process.argv[2];
if (!city) {
    console.log("Por favor, informe o nome da cidade.");
    process.exit(1);
}
(0, weatherService_1.showWeather)(city).catch(error => {
    console.error("Erro:", error.message);
});
