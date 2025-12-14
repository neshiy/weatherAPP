import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Translations = { [lang: string]: { [key: string]: string } };

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations: Translations = {
    en: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': 'Home',
      'menu.settings': 'Settings',
      'settings.title': '⚙️ Settings',
      'settings.apply': 'Apply',
      'settings.cancel': 'Cancel',
      'settings.unsaved': 'You have unsaved changes',
      'units.title': 'Units',
      'theme.title': 'Theme',
      'notifications.title': 'Notifications',
      'location.title': 'Location Preferences',
      'map.title': 'Location Map',
      'search.placeholder': 'Enter city name',
      'search.button': '🔍 Search',
      'search.detect': '📍 Detect Location',
      'loading': 'Loading weather data...',
      'air.quality': 'Air Quality'
    },
    es: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': 'Inicio',
      'menu.settings': 'Ajustes',
      'settings.title': '⚙️ Ajustes',
      'settings.apply': 'Aplicar',
      'settings.cancel': 'Cancelar',
      'settings.unsaved': 'Tienes cambios sin guardar',
      'units.title': 'Unidades',
      'theme.title': 'Tema',
      'notifications.title': 'Notificaciones',
      'location.title': 'Preferencias de ubicación',
      'map.title': 'Mapa de ubicación',
      'search.placeholder': 'Introduce el nombre de la ciudad',
      'search.button': '🔍 Buscar',
      'search.detect': '📍 Detectar ubicación',
      'loading': 'Cargando datos del clima...',
      'air.quality': 'Calidad del aire'
    },
    fr: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': 'Accueil',
      'menu.settings': 'Paramètres',
      'settings.title': '⚙️ Paramètres',
      'settings.apply': 'Appliquer',
      'settings.cancel': 'Annuler',
      'settings.unsaved': 'Modifications non enregistrées',
      'units.title': 'Unités',
      'theme.title': 'Thème',
      'notifications.title': 'Notifications',
      'location.title': 'Préférences de localisation',
      'map.title': 'Carte',
      'search.placeholder': 'Entrez le nom de la ville',
      'search.button': '🔍 Rechercher',
      'search.detect': '📍 Détecter la position',
      'loading': 'Chargement des données météo...',
      'air.quality': 'Qualité de l’air'
    },
    de: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': 'Startseite',
      'menu.settings': 'Einstellungen',
      'settings.title': '⚙️ Einstellungen',
      'settings.apply': 'Übernehmen',
      'settings.cancel': 'Abbrechen',
      'settings.unsaved': 'Sie haben nicht gespeicherte Änderungen',
      'units.title': 'Einheiten',
      'theme.title': 'Thema',
      'notifications.title': 'Benachrichtigungen',
      'location.title': 'Standort-Einstellungen',
      'map.title': 'Karte',
      'search.placeholder': 'Städtenamen eingeben',
      'search.button': '🔍 Suchen',
      'search.detect': '📍 Standort erkennen',
      'loading': 'Wetterdaten werden geladen...',
      'air.quality': 'Luftqualität'
    },
    pt: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': 'Início',
      'menu.settings': 'Configurações',
      'settings.title': '⚙️ Configurações',
      'settings.apply': 'Aplicar',
      'settings.cancel': 'Cancelar',
      'settings.unsaved': 'Você tem alterações não salvas',
      'units.title': 'Unidades',
      'theme.title': 'Tema',
      'notifications.title': 'Notificações',
      'location.title': 'Preferências de localização',
      'map.title': 'Mapa',
      'search.placeholder': 'Digite o nome da cidade',
      'search.button': '🔍 Pesquisar',
      'search.detect': '📍 Detectar localização',
      'loading': 'Carregando dados do tempo...',
      'air.quality': 'Qualidade do ar'
    },
    ru: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': 'Главная',
      'menu.settings': 'Настройки',
      'settings.title': '⚙️ Настройки',
      'settings.apply': 'Применить',
      'settings.cancel': 'Отмена',
      'settings.unsaved': 'Есть несохранённые изменения',
      'units.title': 'Единицы',
      'theme.title': 'Тема',
      'notifications.title': 'Уведомления',
      'location.title': 'Настройки местоположения',
      'map.title': 'Карта',
      'search.placeholder': 'Введите название города',
      'search.button': '🔍 Поиск',
      'search.detect': '📍 Определить местоположение',
      'loading': 'Загрузка данных о погоде...',
      'air.quality': 'Качество воздуха'
    },
    ja: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': 'ホーム',
      'menu.settings': '設定',
      'settings.title': '⚙️ 設定',
      'settings.apply': '適用',
      'settings.cancel': 'キャンセル',
      'settings.unsaved': '保存されていない変更があります',
      'units.title': '単位',
      'theme.title': 'テーマ',
      'notifications.title': '通知',
      'location.title': '位置設定',
      'map.title': '地図',
      'search.placeholder': '都市名を入力',
      'search.button': '🔍 検索',
      'search.detect': '📍 現在地を検出',
      'loading': '天気データを読み込み中...',
      'air.quality': '大気品質'
    },
    ko: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': '홈',
      'menu.settings': '설정',
      'settings.title': '⚙️ 설정',
      'settings.apply': '적용',
      'settings.cancel': '취소',
      'settings.unsaved': '저장되지 않은 변경 사항이 있습니다',
      'units.title': '단위',
      'theme.title': '테마',
      'notifications.title': '알림',
      'location.title': '위치 환경설정',
      'map.title': '지도',
      'search.placeholder': '도시 이름을 입력하세요',
      'search.button': '🔍 검색',
      'search.detect': '📍 위치 감지',
      'loading': '날씨 데이터를 불러오는 중...',
      'air.quality': '대기질'
    },
    zh: {
      'app.title': 'WeatherDash 🌦',
      'menu.home': '首页',
      'menu.settings': '设置',
      'settings.title': '⚙️ 设置',
      'settings.apply': '应用',
      'settings.cancel': '取消',
      'settings.unsaved': '您有未保存的更改',
      'units.title': '单位',
      'theme.title': '主题',
      'notifications.title': '通知',
      'location.title': '位置偏好',
      'map.title': '地图',
      'search.placeholder': '输入城市名称',
      'search.button': '🔍 搜索',
      'search.detect': '📍 检测位置',
      'loading': '正在加载天气数据...',
      'air.quality': '空气质量'
    }
  };

  private langSubject = new BehaviorSubject<string>('en');
  public lang$ = this.langSubject.asObservable();

  constructor() {
    // initialize from saved settings if available
    try {
      const saved = localStorage.getItem('weatherAppSettings');
      if (saved) {
        const s = JSON.parse(saved);
        if (s && s.language && this.translations[s.language]) {
          this.setLanguage(s.language);
        }
      }
    } catch (e) { /* ignore */ }

    // listen for settings apply events
    try {
      window.addEventListener('settings:applied', (ev: any) => {
        try {
          const detail = ev?.detail;
          if (detail) {
            const settings = typeof detail === 'string' ? JSON.parse(detail) : detail;
            if (settings.language && this.translations[settings.language]) {
              this.setLanguage(settings.language);
            }
          }
        } catch (e) { /* ignore */ }
      });
    } catch (e) { /* ignore */ }
  }

  setLanguage(lang: string) {
    if (!this.translations[lang]) lang = 'en';
    this.langSubject.next(lang);
  }

  get currentLang() {
    return this.langSubject.getValue();
  }

  t(key: string): string {
    const lang = this.currentLang || 'en';
    return this.translations[lang][key] ?? this.translations['en'][key] ?? key;
  }
}
