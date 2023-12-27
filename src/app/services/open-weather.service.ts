import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class OpenWeather {

    url: String = environment.weatherApi;
    apiKey: String = environment.weatherApiKey;

    constructor(
        private http: HttpClient
    ){}

    getCityData(city: String, success: CallableFunction) {
        this.http.get(`${this.url}/geo/1.0/direct?q=${city}&limit=100&appid=${this.apiKey}`).subscribe({
            next: (data) => success(data),
            error: (e) =>  console.error('Error fetching data:', e),
            complete: () => console.info('complete') 
        });
    } 

}
