import * as L from 'leaflet';

export class AppConfig {
  public static get baseURL(): string {
    // return 'http://93.90.221.10:33380';
     return 'http://localhost:33380';
  }

  public static get mainMenu() {
    return [{
      'title': 'Монитор',
      'icon': 'fas fa-desktop',
      'href': '#'
    }, {
      'title': 'Ноды',
      'icon': 'fas fa-grip-vertical',
      'href': 'node'
    }, {
      'title': 'Параметры',
      'icon': 'fas fa-cog',
      'href': 'setting'
    }, {
      'title': 'Карта',
      'icon': 'fas fa-map',
      'href': 'map'
    }, {
      'title': 'Пользователи',
      'icon': 'fas fa-users',
      'href': 'user'
    }, {
      'title': 'Клиенты',
      'icon': 'fas fa-server',
      'href': 'client'
    }, {
      'title': 'Транспорт',
      'icon': 'fas fa-bus',
      'href': 'unit'
    }, {
      'title': 'Геозоны',
      'icon': 'fas fa-map-marker-alt',
      'href': 'geozone'
    }];
  }

  public static get mapLayers() {
    return {
      OpenStreetMap: L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          crs: L.CRS.EPSG3857,
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        }
      ),
      'Yandex': L.tileLayer(
        'http://vec{s}.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU',
        {
          crs: L.CRS.EPSG3395,
          subdomains: ['01', '02', '03', '04'],
          attribution: '&copy; <a href="http://yandex.ru/copyright">Яндекс</a>'
        }),
    };
  }
}
