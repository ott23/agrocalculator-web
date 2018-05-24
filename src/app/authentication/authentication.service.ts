import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = AppConfig.baseURL;
  }

  public doLogin(credentials) {
    const url = this.baseURL + '/login';
    this.http.post(url, credentials, {observe: 'response'})
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.headers.get('X-Token'));
          return true;
        },
        () => {
          return false;
        }
      )
    ;

  }

  doLogout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    /*
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(localStorage.getItem('token'));
    */
    return false;
  }

}
