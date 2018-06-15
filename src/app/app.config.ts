import * as L from 'leaflet';

export class AppConfig {
  public static get baseURL(): string {
    // return 'http://192.168.1.10:8080';
    return 'http://localhost:8080';
  }

  public static get mainMenu() {
    return [{
      'title': 'Монитор',
      'icon': 'fa fa-desktop',
      'href': '#'
    }, {
      'title': 'Вычислители',
      'icon': 'fa fa-calculator',
      'href': 'calculator'
    }, {
      'title': 'Параметры',
      'icon': 'fa fa-cog',
      'href': 'setting'
    }, {
      'title': 'Карта',
      'icon': 'fa fa-map',
      'href': 'map'
    }, {
      'title': 'Пользователи',
      'icon': 'fa fa-users',
      'href': 'user'
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
