import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import * as L from 'leaflet';
import {AppConfig} from '../../app.config';
import {MapService} from './map.service';
import {catchError} from 'rxjs/internal/operators';
import {Location} from './models/location.model';
import {of} from 'rxjs';
import {Geometry} from './models/geometry.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  isAddGeometryModalVisible = false;
  isGeometryListModalVisible = false;
  mapLayers = AppConfig.mapLayers;
  location: Location;
  map: L.Map;
  layerGroup: L.FeatureGroup;
  geometryArray: Geometry[] = [];

  constructor(private sharedService: SharedService, private mapService: MapService) {
    this.sharedService.emitLoader(true);
    this.sharedService.addGeometryModalVisibleSubjectObservable.subscribe(
      (addGeometryModalVisibleStatus) => this.isAddGeometryModalVisible = addGeometryModalVisibleStatus
    );
    this.sharedService.geometryListModalVisibleSubjectObservable.subscribe(
      (geoListModalVisibleStatus) => this.isGeometryListModalVisible = geoListModalVisibleStatus
    );
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
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
        this.location = location;
        const map = L.map('map', {
          zoomControl: false,
          center: location.latlng,
          zoom: 12,
          minZoom: 4,
          maxZoom: 18,
          crs: L.CRS.EPSG3857,
          layers: [this.mapLayers.OpenStreetMap]
        });

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

        L.control.layers(this.mapLayers, {}, {position: 'topright'}).addTo(map);
        L.control.zoom({position: 'topright'}).addTo(map);
        L.control.scale().addTo(map);

        this.layerGroup = new L.FeatureGroup();
        this.layerGroup.addTo(map);

        this.sharedService.emitLoader(false);

        this.map = map;
      });
  }

  toggleAddGeometryModal() {
    this.sharedService.emitAddGeometryModalVisible();
  }

  toggleGeometryListModal() {
    this.sharedService.emitGeometryListModalVisible();
  }

  navigation(command: string) {
    switch (command) {
      case 'showAddGeometryModal':
        this.toggleAddGeometryModal();
        break;
      case 'showGeometryListModal':
        this.toggleGeometryListModal();
        break;
      case 'refreshMap':
        this.clearLayers();
        break;
      case 'fitBounds':
        this.fitBounds(this.layerGroup.getBounds());
        break;
      case 'showClient':
        this.map.setView(this.location.latlng, this.map.getZoom());
        break;
      default:
        break;
    }
  }

  geometryList(input) {
    const operation = input[0];
    const id = input[1];

    switch (operation) {
      case 'remove':
        this.removeGeometry(id);
        break;
      case 'toggle':
        this.toggleGeometry(id);
        break;
      default:
        break;
    }

  }

  addGeometry(geometry) {
    if (this.isAddGeometryModalVisible) {
      this.toggleAddGeometryModal();
    }
    const name = geometry[0];
    const geo = L.geoJSON(JSON.parse(geometry[1]));
    this.geometryArray.push(new Geometry(name, geo));
    this.layerGroup.addLayer(geo);
    this.fitBounds(geo.getBounds());
  }

  toggleGeometry(id: number) {
    const geo = this.geometryArray[id];
    if (geo.isVisible) {
      this.layerGroup.removeLayer(geo.layer);
    } else {
      this.layerGroup.addLayer(geo.layer);
    }
    // geo.isVisible = !geo.isVisible;
    this.geometryArray[id].isVisible = !this.geometryArray[id].isVisible;
  }

  removeGeometry(id: number) {
    const geo = this.geometryArray[id];
    this.layerGroup.removeLayer(geo.layer);
    this.geometryArray.splice(id);
  }

  fitBounds(bounds: L.LatLngBounds) {
    try {
      this.map.fitBounds(bounds, {});
    } catch (e) {
      alert('Границы не доступны');
    }
  }

  clearLayers() {
    this.layerGroup.clearLayers();
    this.geometryArray = [];
  }

}
