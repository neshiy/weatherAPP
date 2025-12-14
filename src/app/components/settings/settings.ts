import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {

  // Units settings
  temperatureUnit: string = 'metric'; // 'metric' or 'imperial'
  windSpeedUnit: string = 'm/s'; // 'm/s', 'km/h', 'mph'
  pressureUnit: string = 'hPa'; // 'hPa', 'mmHg'

  // Theme settings
  theme: string = 'dark'; // 'dark' or 'light'
  autoTheme: boolean = false;

  // Notification settings
  weatherAlerts: boolean = true;
  severeWeatherNotifications: boolean = true;
  dailyForecastNotification: boolean = false;
  dailyForecastTime: string = '08:00';
  emailAlerts: boolean = false;
  smsAlerts: boolean = false;

  // Location preferences
  defaultCity: string = '';
  allowGeolocation: boolean = true;
  favoriteCities: string[] = [];

  // Map settings
  mapStyle: string = 'dark'; // 'dark', 'light', 'satellite'
  showWeatherIcons: boolean = true;

  // Language settings
  language: string = 'en'; // 'en', 'es', etc.

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    // Load settings from localStorage or service
    const savedSettings = localStorage.getItem('weatherAppSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      Object.assign(this, settings);
    }
  }

  saveSettings() {
    const settings = {
      temperatureUnit: this.temperatureUnit,
      windSpeedUnit: this.windSpeedUnit,
      pressureUnit: this.pressureUnit,
      theme: this.theme,
      autoTheme: this.autoTheme,
      weatherAlerts: this.weatherAlerts,
      severeWeatherNotifications: this.severeWeatherNotifications,
      dailyForecastNotification: this.dailyForecastNotification,
      dailyForecastTime: this.dailyForecastTime,
      emailAlerts: this.emailAlerts,
      smsAlerts: this.smsAlerts,
      defaultCity: this.defaultCity,
      allowGeolocation: this.allowGeolocation,
      favoriteCities: this.favoriteCities,
      mapStyle: this.mapStyle,
      showWeatherIcons: this.showWeatherIcons,
      language: this.language
    };
    localStorage.setItem('weatherAppSettings', JSON.stringify(settings));
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.saveSettings();
    this.applyTheme();
  }

  toggleAutoTheme() {
    this.autoTheme = !this.autoTheme;
    this.saveSettings();
    if (this.autoTheme) {
      this.setAutoTheme();
    }
  }

  private applyTheme() {
    document.body.className = this.theme === 'dark' ? 'dark-theme' : 'light-theme';
  }

  private setAutoTheme() {
    const hour = new Date().getHours();
    this.theme = hour >= 6 && hour < 18 ? 'light' : 'dark';
    this.applyTheme();
  }

  addFavoriteCity(city: string) {
    if (city && !this.favoriteCities.includes(city)) {
      this.favoriteCities.push(city);
      this.saveSettings();
    }
  }

  removeFavoriteCity(city: string) {
    this.favoriteCities = this.favoriteCities.filter(c => c !== city);
    this.saveSettings();
  }

  onSettingChange() {
    this.saveSettings();
  }
}
