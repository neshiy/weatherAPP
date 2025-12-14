import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { WeatherService } from '../../services/weather.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class WeatherComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  weatherData: any;
  forecastData: any[] = [];
  airQualityData: any;
  errorMessage: string = '';
  city: string = '';
  unit: string = 'metric'; // metric or imperial
  darkMode: boolean = true;

  // Map data
  mapOptions: any;
  mapLayers: L.Layer[] = [];
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  private bodyClassObserver: MutationObserver | undefined;
  private tileLayer: L.TileLayer | undefined;

  constructor(private weatherService: WeatherService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.getLocation();
  }

  ngAfterContentInit() {
    // ensure language is in sync with saved settings on load
    try {
      const saved = localStorage.getItem('weatherAppSettings');
      if (saved) {
        const s = JSON.parse(saved);
        if (s && s.language) {
          // no-op here; TranslationService listens to settings:applied event
        }
      }
    } catch (e) { }
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.syncThemeFromBody();
    this.setupBodyClassObserver();
    // listen for sidebar toggles to recalc map size
    window.addEventListener('sidebar:toggled', this.onSidebarToggled as EventListener);
  }

  initializeMap() {
    if (this.mapContainer) {
      this.map = L.map(this.mapContainer.nativeElement).setView([0, 0], 2);

      // add tile layer according to current theme
      this.setMapStyle(!document.body.classList.contains('light-theme'));

      // Invalidate size after a short delay to ensure container is fully rendered
      setTimeout(() => {
        try { this.map?.invalidateSize(); } catch(e) { /* ignore */ }
      }, 200);

      // Recalculate size on window resize
      window.addEventListener('resize', this.onWindowResize);
    }
  }

  private onWindowResize = () => {
    if (this.map) {
      try { this.map.invalidateSize(); } catch(e) { }
    }
  }

  private onSidebarToggled = (ev: CustomEvent) => {
    // small delay to allow layout transition
    setTimeout(() => {
      if (this.map) {
        try { this.map.invalidateSize(); } catch(e) {}
      }
    }, 220);
  }

  private setMapStyle(isDark: boolean) {
    // remove existing
    try { if (this.tileLayer && this.map) { this.map.removeLayer(this.tileLayer); } } catch(e) {}

    const darkUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    const lightUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    const url = isDark ? darkUrl : lightUrl;
    this.tileLayer = L.tileLayer(url, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      maxZoom: 19
    });

    if (this.map) this.tileLayer.addTo(this.map);
  }

  private getMarkerIcon(): L.Icon {
    return L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }

  private syncThemeFromBody() {
    const body = document.body;
    if (!body) return;
    const isDark = body.classList.contains('dark-theme');
    this.darkMode = isDark;
  }

  private setupBodyClassObserver() {
    const body = document.body;
    if (!body || typeof MutationObserver === 'undefined') return;
    this.bodyClassObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && (m as any).attributeName === 'class') {
          this.syncThemeFromBody();
          // ensure map redraw when theme (and possibly layout) changes
          if (this.map) {
            setTimeout(() => { try { this.map?.invalidateSize(); } catch(e) {} }, 150);
          }
        }
      }
    });
    this.bodyClassObserver.observe(body, { attributes: true, attributeFilter: ['class'] });
  }

  ngOnDestroy(): void {
    try { window.removeEventListener('resize', this.onWindowResize); } catch(e) {}
    try { window.removeEventListener('sidebar:toggled', this.onSidebarToggled as EventListener); } catch(e) {}
    if (this.bodyClassObserver) this.bodyClassObserver.disconnect();
  }

  updateMap(lat: number, lon: number) {
    if (this.map) {
      this.map.setView([lat, lon], 10);

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      this.marker = L.marker([lat, lon], { icon: this.getMarkerIcon() }).addTo(this.map);
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeather(lat, lon);
        },
        (error) => {
          this.errorMessage = 'Unable to retrieve your location. Please allow location access.';
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  getWeather(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon, this.unit).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = '';
        // Ensure Angular runs change detection and the UI is repainted so
        // the hero card becomes visible immediately (fixes render-on-toggle bug).
        try { this.cd.detectChanges(); } catch(e) { /* ignore */ }
        // small delay then trigger a resize event to force layout/reflow
        requestAnimationFrame(() => { try { window.dispatchEvent(new Event('resize')); } catch(e) {} });

        this.getForecast(lat, lon);
        this.getAirQuality(lat, lon);
        this.updateMap(lat, lon);
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch weather data. Please try again.';
      }
    });
  }

  getForecast(lat: number, lon: number) {
    this.weatherService.getForecast(lat, lon, this.unit).subscribe({
      next: (data: any) => {
        this.processForecast(data.list);
      },
      error: (error) => {
        console.error('Failed to fetch forecast data', error);
      }
    });
  }

  getAirQuality(lat: number, lon: number) {
    this.weatherService.getAirQuality(lat, lon).subscribe({
      next: (data: any) => {
        this.airQualityData = data.list[0]; // Current air quality
      },
      error: (error) => {
        console.error('Failed to fetch air quality data', error);
      }
    });
  }

  processForecast(list: any[]) {
    const dailyForecast: { [key: string]: any } = {};
    list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          date: date,
          temps: [],
          weather: item.weather[0],
          icon: item.weather[0].icon
        };
      }
      dailyForecast[date].temps.push(item.main.temp);
    });

    this.forecastData = Object.values(dailyForecast).map((day: any) => ({
      ...day,
      minTemp: Math.min(...day.temps),
      maxTemp: Math.max(...day.temps)
    })).slice(0, 5); // Take first 5 days
  }

  searchWeather() {
    if (this.city.trim()) {
      this.weatherService.getWeatherByCity(this.city, this.unit).subscribe({
        next: (data) => {
          this.weatherData = data;
          this.errorMessage = '';
          try { this.cd.detectChanges(); } catch(e) { }
          requestAnimationFrame(() => { try { window.dispatchEvent(new Event('resize')); } catch(e) {} });
          this.getForecast((data as any).coord.lat, (data as any).coord.lon);
          this.getAirQuality((data as any).coord.lat, (data as any).coord.lon);
          this.updateMap((data as any).coord.lat, (data as any).coord.lon);
        },
        error: (error) => {
          this.errorMessage = 'City not found. Please check the spelling.';
        }
      });
    }
  }

  toggleUnit() {
    this.unit = this.unit === 'metric' ? 'imperial' : 'metric';
    if (this.weatherData) {
      // Refresh weather data with new unit
      const lat = this.weatherData.coord.lat;
      const lon = this.weatherData.coord.lon;
      this.getWeather(lat, lon);
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  getWeatherEmoji(condition: string): string {
    const icons: { [key: string]: string } = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    };
    return icons[condition] || '☀️';
  }

  getTempPercentage(temp: number): number {
    // Assuming -50 to 50°C range for percentage
    const minTemp = this.unit === 'metric' ? -50 : -58;
    const maxTemp = this.unit === 'metric' ? 50 : 122;
    return Math.max(0, Math.min(100, ((temp - minTemp) / (maxTemp - minTemp)) * 100));
  }

  getGradient(condition: string): string {
    const lower = condition.toLowerCase();
    if (lower.includes('clear')) return 'linear-gradient(135deg, #FFD700, #FFA500)';
    if (lower.includes('cloud')) return 'linear-gradient(135deg, #B0C4DE, #778899)';
    if (lower.includes('rain') || lower.includes('drizzle')) return 'linear-gradient(135deg, #4682B4, #1E90FF)';
    if (lower.includes('thunderstorm')) return 'linear-gradient(135deg, #2F4F4F, #000080)';
    if (lower.includes('snow')) return 'linear-gradient(135deg, #FFFFFF, #E0FFFF)';
    if (lower.includes('mist') || lower.includes('fog') || lower.includes('haze')) return 'linear-gradient(135deg, #D3D3D3, #A9A9A9)';
    return 'linear-gradient(135deg, #87CEEB, #4682B4)'; // default sky blue
  }

  getDayName(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  }

  getAQIColor(aqi: number): string {
    if (aqi <= 1) return '#00e400'; // Good
    if (aqi <= 2) return '#ffff00'; // Moderate
    if (aqi <= 3) return '#ff7e00'; // Unhealthy for sensitive
    if (aqi <= 4) return '#ff0000'; // Unhealthy
    return '#8f3f97'; // Very unhealthy
  }

  getAQIDescription(aqi: number): string {
    if (aqi <= 1) return 'Good';
    if (aqi <= 2) return 'Moderate';
    if (aqi <= 3) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 4) return 'Unhealthy';
    return 'Very Unhealthy';
  }

  getHourlyData(): any[] {
    if (!this.weatherData) return [];
    // For now, return mock data or from forecast
    // Since forecast is daily, return some mock hourly
    const baseTemp = this.weatherData.main.temp;
    return Array.from({ length: 8 }, (_, i) => ({
      time: (new Date().getHours() + i) % 24 + ':00',
      temp: baseTemp + (Math.random() - 0.5) * 5 // Mock variation
    }));
  }
}
