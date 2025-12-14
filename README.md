# WeatherAPP

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.3.

## Development server

To start a local development server, run:

# WeatherAPP

A lightweight Angular-based weather dashboard showing current conditions, forecast, air quality and a map.

**Quick Start**

- **Requirements:** Node.js (16+), npm, Angular CLI (optional).
- **Install:**

	```bash
	npm install
	```

- **Run (dev):**

	```bash
	ng serve
	# then open http://localhost:4200/
	```

- **Build (production):**

	```bash
	npm run build
	# or: ng build --configuration production
	```

**Features**

- Current weather lookup (by geolocation or city search).
- 5-day forecast cards.
- Air quality (OpenWeather Air Pollution API).
- Interactive Leaflet map with dark/light basemaps and a marker for the selected location.
- Theme and units are saved to `localStorage` via the Settings panel.

**Notes / Troubleshooting**

- If the hero card appears blank on a hard refresh but becomes visible after you toggle the sidebar, an automatic fix was added: the app now forces a small repaint (change detection + a `resize` event) after weather data loads so the hero card and map render immediately. If you still see issues, try a manual browser refresh and make sure Leaflet CSS is loaded in `src/styles.css`.
- Marker and Leaflet icon assets are loaded from remote URLs. You can copy them into `src/assets/` and update the icon paths in `src/app/components/weather/weather.ts` if you prefer local assets.

**Development notes**

- Map redraws on sidebar toggle via a dispatched `sidebar:toggled` event. The app also invalidates the Leaflet map size on window `resize` and when the theme (`body` class) changes.

Enjoy — ask if you want a README expanded with screenshots or deployment steps!
