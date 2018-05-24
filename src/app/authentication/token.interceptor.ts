import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const TOKEN_HEADER = 'Authorization';
    const TOKEN_PREFIX = 'Bearer';
    const token = localStorage.getItem('token');
    let authReq = req;
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER, TOKEN_PREFIX + ' ' + token)});
    }
    return next.handle(authReq);
  }

}
