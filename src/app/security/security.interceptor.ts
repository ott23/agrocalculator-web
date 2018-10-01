import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ConfigurationService} from '../common/services/configuration.service';


@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  baseURL: string;

  constructor(private configurationService: ConfigurationService) {
    this.baseURL = 'test';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const TOKEN_HEADER = 'Authorization';
    const TOKEN_PREFIX = 'Bearer';
    const token = localStorage.getItem('token');
    let authReq = req;
    if (token != null && req.url.startsWith(this.baseURL)) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER, TOKEN_PREFIX + ' ' + token)});
    }
    return next.handle(authReq).pipe(
      map(
        (data: any) => { // Success
          if (data.hasOwnProperty('headers')) {
            const helper = new JwtHelperService();
            const inputToken = data.headers.get('X-Token');
            if (inputToken != null) {
              const subject = helper.decodeToken(inputToken).sub;
              localStorage.setItem('user', subject);
              localStorage.setItem('token', inputToken);
            }
          }
          return data;
        }
      ));
  }

}
