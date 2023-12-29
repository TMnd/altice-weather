export class CityPreviewData {
    city: string;
    temperature: number;
    weather: string;
    humidity: number;
    pressure: number;
    sea_level: number;

    constructor(city: string, temperature: number, weather: string, humidity: number, pressure: number, sea_level: number) {
        this.city = city;
        this.temperature = temperature;
        this.weather = weather;
        this.humidity = humidity;
        this.pressure = pressure;
        this.sea_level = sea_level;
    }
}