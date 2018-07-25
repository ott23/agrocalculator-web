import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SharedService {

  // Анимация загрузки: объявление
  private loaderSubject = new Subject<boolean>();
  loaderObservable = this.loaderSubject.asObservable();

  // Анимация загрзуки: реализация
  emitLoader(loaderStatus: boolean) {
    this.loaderSubject.next(loaderStatus);
  }

}
