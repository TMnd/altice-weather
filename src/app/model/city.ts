export class City {
    name: string;
    lon: string;
    lat: string;
    country: string;
    state: string;

    constructor(name: string, lon: string, lat: string, country: string, state: string) {
        this.name = name;
        this.lon = lon;
        this.lat = lat;
        this.country = country;
        this.state = state;
    }
}