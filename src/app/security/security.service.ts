import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../common/services/configuration.service';

@Injectable()
export class SecurityService {

  baseURL: string;

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.baseURL = configurationService.config.baseUrl;
  }

  public doLogin(credentials): Observable<any> {
    const url = this.baseURL + '/login';
    return this.http.post<any>(url, credentials, {observe: 'response'});
  }

  doLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(localStorage.getItem('token'));
  }

}
