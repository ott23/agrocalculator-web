import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MainService} from '../main.service';
import * as L from 'leaflet';
import {AppConfig} from '../../app.config';
import {MapService} from './map.service';
import {catchError} from 'rxjs/internal/operators';
import {Location} from './models/location.model';
import {of} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() loaderStatusChanged = new EventEmitter<boolean>();
  mapLayers = AppConfig.mapLayers;
  map: L.Map;

  constructor(private mainService: MainService, private mapService: MapService) {
  }

  ngOnInit() {
    this.mainService.emitLoaderStatus(false);

    this.mapService.getLocation()
      .pipe(
        catchError(err => {
          console.error(err);
          const location = new Location();
          location.latlng = L.latLng(52.721219, 41.452274);
          return of(location);
        })
      )
      .subscribe((location: Location) => {
        const map = L.map('map', {
          zoomControl: false,
          center: location.latlng,
          zoom: 12,
          minZoom: 4,
          maxZoom: 19,
          crs: L.CRS.EPSG3857,
          layers: [this.mapLayers.OpenStreetMap]
        });

        L.control.layers(this.mapLayers, {}, {position: 'topright'}).addTo(map);
        L.control.zoom({position: 'topright'}).addTo(map);
        L.control.scale().addTo(map);

        map.on('baselayerchange', function (e: any) {
          const center = map.getCenter();
          const zoom = map.getZoom();
          if (e.name === 'Yandex') {
            map.options.crs = L.CRS.EPSG3395;
          } else {
            map.options.crs = L.CRS.EPSG3857;
          }
          map.setView(center, zoom);
        });

        // const polygon = L.geoJSON()

        this.map = map;
      });
  }

  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);

    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }

  fitBounds(bounds: L.LatLngBounds) {
    this.map.fitBounds(bounds, {});
  }

}
