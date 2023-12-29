export class CityPreviewData {
    temperature: number;
    weather: string;
    weatherId: number;
    humidity: number;
    pressure: number;
    sea_level: number;

    constructor(temperature: number, weather: string, weatherId: number, humidity: number, pressure: number, sea_level: number) {
        this.temperature = temperature;
        this.weather = weather;
        this.weatherId = weatherId;
        this.humidity = humidity;
        this.pressure = pressure;
        this.sea_level = sea_level;
    }
}