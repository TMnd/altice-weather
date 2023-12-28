import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class OpenWeather {

    url: String = environment.weatherApi;
    apiKey: String = environment.weatherApiKey;

    constructor(
        private http: HttpClient
    ){}

    getCityList(city: String, success: CallableFunction) {
        this.http.get(`${this.url}/geo/1.0/direct?q=${city}&limit=100&appid=${this.apiKey}`).subscribe({
            next: (data) => success(data),
            error: (e) =>  console.error('Error fetching data:', e),
            complete: () => console.info('Get city list request...') 
        });
    }

    getCityData(lat: string, lon: string, success: CallableFunction) {
        this.http.get(`${this.url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`).subscribe({
            next: (data) => success(data),
            error: (e) =>  console.error('Error fetching data:', e),
            complete: () => console.info('Get city data request...') 
        });
    }

}
