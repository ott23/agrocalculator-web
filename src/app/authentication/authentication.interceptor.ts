import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../app.config';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const TOKEN_HEADER = 'Authorization';
    const TOKEN_PREFIX = 'Bearer';
    const token = localStorage.getItem('token');
    let authReq = req;
    if (token != null && req.url.startsWith(AppConfig.baseURL)) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER, TOKEN_PREFIX + ' ' + token)});
    }
    return next.handle(authReq);
  }

}
