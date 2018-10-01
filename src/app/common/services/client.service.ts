import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../models/client.model';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class ClientService {

  baseURL: string;

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.baseURL = configurationService.config.baseUrl + '/client';
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
