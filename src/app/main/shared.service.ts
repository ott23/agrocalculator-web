import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SharedService {

  private loaderStatus = new Subject<boolean>();
  loaderStatusObservable = this.loaderStatus.asObservable();

  emitLoaderStatus(loaderStatus: boolean) {
    this.loaderStatus.next(loaderStatus);
  }
}
