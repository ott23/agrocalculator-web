import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../models/client.model';

@Injectable()
export class ClientService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = AppConfig.baseURL + '/client';
  }

  public getAll(): Observable<Client[]> {
    const url = this.baseURL;
    return this.http.get<Client[]>(url);
  }

  public save(client): Observable<any> {
    const url = this.baseURL + '/save';
    return this.http.post(url, client);
  }

  public delete(id: string): Observable<any> {
    const url = this.baseURL + '/delete/' + id;
    return this.http.get(url);
  }
}
