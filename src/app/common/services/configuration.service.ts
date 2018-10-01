import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ConfigurationService {

  public config: any;

  constructor(private http: HttpClient) {

  }

  load(): Promise<any> {
    return this.http.get('assets/config/config.json')
      .toPromise()
      .then(res => this.config = res)
      .catch(this.handleError);
  }

  private handleError(error: HttpResponse<any> | any) {
    let errMsg: string;
    if (error instanceof HttpResponse) {
      const currentError: any = error;
      const body = currentError.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return new Promise((resolve) => {
      resolve(errMsg);
    });
  }

}


