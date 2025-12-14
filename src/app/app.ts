import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './components/weather/weather';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, WeatherComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('weatherAPP');
  currentDate: Date = new Date();
  sidebarCollapsed = false;
  activeRoute = 'home';

  ngOnInit() {
    // Update date every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    // notify other parts of the app (e.g., map) that the sidebar toggled
    try {
      window.dispatchEvent(new CustomEvent('sidebar:toggled', { detail: { collapsed: this.sidebarCollapsed } }));
    } catch (e) {
      // ignore in non-browser contexts
    }
    // trigger a resize shortly after transition to help libraries recalc layout
    setTimeout(() => {
      try { window.dispatchEvent(new Event('resize')); } catch (e) { }
    }, 260);
  }

  setActiveRoute(route: string) {
    this.activeRoute = route;
  }
}
