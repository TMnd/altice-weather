import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { City, CityData } from '../../components/input-data/city-search/model/city.interface';

@Injectable({
  providedIn: 'root',
})
export class OpenWeather {

    url: String = environment.weatherApi;
    apiKey: String = environment.weatherApiKey;

    constructor(
        private http: HttpClient
    ){}

    getCityList(city: String): Observable<City[]> {
        return this.http.get<City[]>(`${this.url}/geo/1.0/direct?q=${city}&limit=100&appid=${this.apiKey}`);
    }

    getCityData(lat: string, lon: string): Observable<CityData> {
        return this.http.get<CityData>(`${this.url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
    }

}
