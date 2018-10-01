import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Geozone} from '../models/geozone.model';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class GeozoneService {

  baseURL: string;

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.baseURL = configurationService.config.baseUrl + '/geozone';
  }

  public getAll(): Observable<Geozone[]> {
    const url = this.baseURL;
    return this.http.get<Geozone[]>(url);
  }

  public save(unit): Observable<any> {
    const url = this.baseURL + '/save';
    return this.http.post(url, unit);
  }

  public delete(id: string): Observable<any> {
    const url = this.baseURL + '/delete/' + id;
    return this.http.get(url);
  }
}
