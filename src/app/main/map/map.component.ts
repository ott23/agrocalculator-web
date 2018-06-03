import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../shared.service';
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

  isAddGeoModalVisible = false;
  mapLayers = AppConfig.mapLayers;
  map: L.Map;

  constructor(private sharedService: SharedService, private mapService: MapService) {
    this.sharedService.emitLoaderStatus(true);
    this.sharedService.addGeoModalVisibleStatusObservable.subscribe(
      (addGeoModalVisibleStatus) => this.isAddGeoModalVisible = addGeoModalVisibleStatus
    );
  }

  ngOnInit() {
    this.sharedService.emitLoaderStatus(true);
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

        this.sharedService.emitLoaderStatus(false);

        this.map = map;
      });
  }

  toggleAddGeoModal() {
    this.sharedService.emitAddGeoModalVisibleStatus();
  }

  addGeo(geojson: string) {

  }

  fitBounds(bounds: L.LatLngBounds) {
    this.map.fitBounds(bounds, {});
  }

}
