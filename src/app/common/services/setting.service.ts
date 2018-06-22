import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {Setting} from '../models/setting.model';

@Injectable()
export class SettingService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = AppConfig.baseURL + '/setting';
  }

  public getAll(): Observable<Setting[]> {
    const url = this.baseURL;
    return this.http.get<Setting[]>(url);
  }

  public getAllByCalculatorId(id): Observable<Setting[]> {
    const url = this.baseURL + '/getByCalculator/' + id;
    return this.http.get<Setting[]>(url);
  }

  public setSettingForCalculator(setting): Observable<any> {
    const url = this.baseURL + '/setForCalculator';
    return this.http.post(url, setting);
  }

  public setSetting(setting): Observable<any> {
    const url = this.baseURL + '/set';
    return this.http.post(url, setting);
  }

  public deleteSetting(id): Observable<any> {
    const url = this.baseURL + '/delete/' + id;
    return this.http.get(url);
  }

}
