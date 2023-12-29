export interface LocalName {
    [key: string]: string;
}

export interface City {
    name: string;
    local_names: LocalName;
    lon: string;
    lat: string;
    country: string;
    state: string;
}

export interface Cloudiness {
    all: string
}

export interface Coordinates {
    lat: string,
    lon: string
}

export interface TemperatureData {
    feels_like: number,
    grnd_level: number,
    humidity: number,
    pressure: number,
    sea_level: number,
    temp: number,
    temp_max: number,
    temp_min: number
}

export interface CitySys {
    country: string,
    id: number,
    sunrise: number,
    sunset: number,
    type: number,
    visibility: number
}

export interface weather {
    description: string,
    icon: string,
    id: number,
    main: string,
}

export interface wind {
    deg: number,
    gust: number,
    speed: number,
}

export interface CityData {
    base: string,
    clouds: string
    cod: Cloudiness,
    coord: Coordinates,
    dt: number,
    id: number,
    main: TemperatureData,
    name: string,
    sys: CitySys,
    weather: weather[],
    wind: wind
}