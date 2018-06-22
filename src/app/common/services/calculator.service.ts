import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Calculator} from '../models/calculator.model';
import {CalculatorStatus} from '../models/calculator-status.model';
import {Setting} from '../models/setting.model';

@Injectable()
export class CalculatorService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = AppConfig.baseURL + '/calculator';
  }

  public getAll(): Observable<Calculator[]> {
    const url = this.baseURL;
    return this.http.get<Calculator[]>(url);
  }

  public delete(id: number): Observable<any> {
    const url = this.baseURL + '/delete/' + id;
    return this.http.get(url);
  }

  public sendKey(id: number): Observable<any> {
    const url = this.baseURL + '/send-key/' + id;
    return this.http.get(url);
  }

  public getStatusesByCalculatorId(id): Observable<CalculatorStatus[]> {
    const url = this.baseURL + '/status/' + id;
    return this.http.get<CalculatorStatus[]>(url);
  }




}
