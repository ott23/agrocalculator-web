import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {Setting} from './setting.model';

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
}
