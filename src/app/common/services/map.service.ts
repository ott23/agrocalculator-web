import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap} from 'rxjs/internal/operators';
import {Location} from '../../main/map/models/location.model';
import * as L from 'leaflet';

@Injectable()
export class MapService {

  constructor(private http: HttpClient) {
  }

  getLocation() {
    return this.http.get('http://ipv4.myexternalip.com/json')
      .pipe(
        mergeMap((result: any) =>
          this.http.get(`https://ipapi.co/${result.ip}/json`))
      )
      .pipe(
        map((result: any) => {
          const location = new Location();
          location.latlng = L.latLng(result.latitude, result.longitude);
          return location;
        })
      );
  }

}
