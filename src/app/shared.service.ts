import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Calculator} from './common/models/calculator.model';

@Injectable()
export class SharedService {

  // Анимация загрузки: объявление
  private loaderSubject = new Subject<boolean>();
  loaderObservable = this.loaderSubject.asObservable();

  // Калькулятор: объявление
  private calculatorSubject = new Subject<[Calculator, string]>();
  calculatorObservable = this.calculatorSubject.asObservable();

  // Анимация загрзуки: реализация
  emitLoader(loaderStatus: boolean) {
    this.loaderSubject.next(loaderStatus);
  }

  // Калькулятор: реализация
  emitCalculator(calculatorModal: [Calculator, string]) {
    this.calculatorSubject.next(calculatorModal);
  }

}
