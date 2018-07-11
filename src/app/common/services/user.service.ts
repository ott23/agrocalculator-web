import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../app.config';

@Injectable()
export class UserService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = AppConfig.baseURL + '/user';
  }

  public getAll(): Observable<User[]> {
    const url = this.baseURL;
    return this.http.get<User[]>(url);
  }

  public save(user): Observable<any> {
    const url = this.baseURL + '/save';
    return this.http.post(url, user);
  }

  public delete(id: number): Observable<any> {
    const url = this.baseURL + '/delete/' + id;
    return this.http.get(url);
  }
}
