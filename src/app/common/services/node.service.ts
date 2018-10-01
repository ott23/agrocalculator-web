import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Node} from '../models/node.model';
import {CalculatorStatus} from '../models/node-status.model';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class NodeService {

  baseURL: string;

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.baseURL = configurationService.config.baseUrl + '/node';
  }

  public getAll(): Observable<Node[]> {
    const url = this.baseURL;
    return this.http.get<Node[]>(url);
  }

  public getAllByName(name: string): Observable<Node[]> {
    const url = this.baseURL + '/getAllByName/' + name;
    return this.http.get<Node[]>(url);
  }

  public kill(id: number): Observable<any> {
    const url = this.baseURL + '/kill/' + id;
    return this.http.get(url);
  }

  public delete(id: number): Observable<any> {
    const url = this.baseURL + '/delete/' + id;
    return this.http.get(url);
  }

  public switch(id: number): Observable<any> {
    const url = this.baseURL + '/switch/' + id;
    return this.http.get(url);
  }

  public shutdown(id: number): Observable<any> {
    const url = this.baseURL + '/shutdown/' + id;
    return this.http.get(url);
  }

  public sendKey(id: number): Observable<any> {
    const url = this.baseURL + '/sendKey/' + id;
    return this.http.get(url);
  }

  public getStatusesByNodeId(id): Observable<CalculatorStatus[]> {
    const url = this.baseURL + '/status/' + id;
    return this.http.get<CalculatorStatus[]>(url);
  }

  public setEditedValue(calculator): Observable<any> {
    const url = this.baseURL + '/set';
    return this.http.post(url, calculator);
  }

}
