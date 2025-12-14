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

# WeatherAPP

A lightweight Angular weather dashboard with current conditions, a 5-day forecast, air-quality data, and an interactive map.

Quick Start

- Requirements: Node.js (16+), npm. Angular CLI is optional but helpful.
- Install dependencies:

	```bash
	npm install
	```

- Run locally:

	```bash
	ng serve
	# then open http://localhost:4200/
	```

- Build production bundle:

	```bash
	npm run build
	# or: ng build --configuration production
	```

What it includes

- Current weather (geolocation or city search)
- 5-day forecast cards
- Air quality (OpenWeather Air Pollution API)
- Interactive Leaflet map with dark/light basemaps and a location marker
- Settings panel (units, theme, language, map style, favorites)

Settings behavior

- Changes in Settings are staged; use the **Apply** button at the bottom to commit them.
- **Cancel** reverts staged changes to the last saved state.
- When you click **Apply**, a `settings:applied` event is dispatched; components listen for this to update (language, map style, etc.).

Translations

- The app ships with a lightweight built-in translator. Select a language in Settings and click **Apply** — the UI text will switch to the chosen language.

Map & assets

- The map uses Leaflet and CARTO basemaps (dark/light). Ensure Leaflet CSS is included in `src/styles.css` so map controls and markers display correctly.
- Marker icons are currently loaded from remote URLs. To use local assets, copy marker images into `src/assets/` and update `getMarkerIcon()` in `src/app/components/weather/weather.ts`.

Troubleshooting

- If the hero card or map appear blank after a hard refresh but render after interacting with the sidebar, the app forces a small repaint after weather data loads (change detection + `resize` event). If problems persist, reload the page and confirm Leaflet CSS is present.
- Builds may show warnings about CommonJS modules (Leaflet) — these are informational and do not prevent the app from running.

Contributing

- Contributions welcome. Fork, create a branch, and open a pull request. Keep changes focused and include tests where appropriate.

License

- MIT
