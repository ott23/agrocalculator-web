import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Unit} from '../models/unit.model';

@Injectable()
export class UnitService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = AppConfig.baseURL + '/unit';
  }

  public getAll(): Observable<Unit[]> {
    const url = this.baseURL;
    return this.http.get<Unit[]>(url);
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
