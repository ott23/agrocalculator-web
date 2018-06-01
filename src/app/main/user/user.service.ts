import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user.model';
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

  public getOneById(id: number): Observable<User> {
    const url = this.baseURL + '/getById/' + id;
    return this.http.get<User>(url);
  }

  public getOneByUsername(username: string): Observable<User> {
    const url = this.baseURL + '/getByUsername/' + username;
    return this.http.get<User>(url);
  }

  public create(user): Observable<User> {
    const url = this.baseURL + '/add';
    return this.http.post<User>(url, user);
  }

  public delete(id: number): Observable<any> {
    const url = this.baseURL + '/delete/' + id;
    return this.http.get(url);
  }
}
