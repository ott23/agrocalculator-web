import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Calculator} from './main/calculator/calculator.model';

@Injectable()
export class SharedService {

  // Анимация загрузки: объявление
  private loaderSubject = new Subject<boolean>();
  loaderSubjectObservable = this.loaderSubject.asObservable();

  // Окно добавления пользователя: объявление
  private isAddUserModalVisible = false;
  private addUserModalVisibleSubject = new Subject<boolean>();
  addUserModalVisibleSubjectObservable = this.addUserModalVisibleSubject.asObservable();

  // Окно импорта GeoJSON: объявление
  private isAddGeometryModalVisible = false;
  private addGeometryModalVisibleSubject = new Subject<boolean>();
  addGeometryModalVisibleSubjectObservable = this.addGeometryModalVisibleSubject.asObservable();

  // Окно списка гео: объявление
  private isGeometryListModalVisible = false;
  private geometryListModalVisibleSubject = new Subject<boolean>();
  geometryListModalVisibleSubjectObservable = this.geometryListModalVisibleSubject.asObservable();

  // Окно статусов калькулятора: объявление
  private isStatusModalVisible = false;
  private statusModalVisibleSubject = new Subject<boolean>();
  statusModalVisibleSubjectObservable = this.statusModalVisibleSubject.asObservable();

  // Окно статусов калькулятора - калькулятор: объявление
  private calculatorSubject = new Subject<Calculator>();
  calculatorSubjectObservable = this.calculatorSubject.asObservable();


  // Анимация загрзуки: реализация
  emitLoader(loaderStatus: boolean) {
    this.loaderSubject.next(loaderStatus);
  }

  // Окно добавления пользователя: реализация
  emitAddUserModalVisible() {
    this.isAddUserModalVisible = !this.isAddUserModalVisible;
    this.addUserModalVisibleSubject.next(this.isAddUserModalVisible);
  }

  // Окно импорта GeoJSON: реализация
  emitAddGeometryModalVisible() {
    this.isAddGeometryModalVisible = !this.isAddGeometryModalVisible;
    this.addGeometryModalVisibleSubject.next(this.isAddGeometryModalVisible);
  }

  // Окно списка гео: реализация
  emitGeometryListModalVisible() {
    this.isGeometryListModalVisible = !this.isGeometryListModalVisible;
    this.geometryListModalVisibleSubject.next(this.isGeometryListModalVisible);
  }

  // Окно статусов калькулятора: реализация
  emitStatusModalVisible() {
    this.isStatusModalVisible = !this.isStatusModalVisible;
    this.statusModalVisibleSubject.next(this.isStatusModalVisible);
  }

  // Окно статусов калькулятора - калькулятор: реализация
  emitCalculator(calculator: Calculator) {
    this.calculatorSubject.next(calculator);
  }


}
