import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '15de3b2aa068998f08479a9066010071';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number, unit: string = 'metric') {
    const units = unit === 'metric' ? 'metric' : 'imperial';
    return this.http.get(
      `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`
    );
  }

  getWeatherByCity(city: string, unit: string = 'metric') {
    const units = unit === 'metric' ? 'metric' : 'imperial';
    return this.http.get(
      `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=${units}`
    );
  }

  getForecast(lat: number, lon: number, unit: string = 'metric') {
    const units = unit === 'metric' ? 'metric' : 'imperial';
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`
    );
  }

  getAirQuality(lat: number, lon: number) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    );
  }
}
