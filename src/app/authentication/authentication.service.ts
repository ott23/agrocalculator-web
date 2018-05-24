import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class AuthenticationService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = AppConfig.baseURL;
  }

  public doLogin(credentials): Observable<any> {

    const url = this.baseURL + '/login';
    return this.http.post<any>(url, credentials, {observe: 'response'}).pipe(
      map(
        data => { // Success
          localStorage.setItem('token', data.headers.get('X-Token'));
          return data;
        }
      )
    );
  }


  doLogout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(localStorage.getItem('token'));
  }

}
