import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Calculator} from './common/models/calculator.model';

@Injectable()
export class SharedService {

  // Анимация загрузки: объявление
  private loaderSubject = new Subject<boolean>();
  loaderObservable = this.loaderSubject.asObservable();

  // Окно добавления пользователя: объявление
  private isAddUserModalVisible = false;
  private addUserModalVisibleSubject = new Subject<boolean>();
  addUserModalVisibleObservable = this.addUserModalVisibleSubject.asObservable();

  // Окно импорта GeoJSON: объявление
  private isAddGeometryModalVisible = false;
  private addGeometryModalVisibleSubject = new Subject<boolean>();
  addGeometryModalVisibleObservable = this.addGeometryModalVisibleSubject.asObservable();

  // Окно списка гео: объявление
  private isGeometryListModalVisible = false;
  private geometryListModalVisibleSubject = new Subject<boolean>();
  geometryListModalVisibleObservable = this.geometryListModalVisibleSubject.asObservable();

  // Калькулятор: объявление
  private calculatorSubject = new Subject<[Calculator, string]>();
  calculatorObservable = this.calculatorSubject.asObservable();

  // Окно статусов калькулятора: объявление
  public isStatusModalVisible = false;
  private statusModalVisibleSubject = new Subject<boolean>();
  statusModalVisibleObservable = this.statusModalVisibleSubject.asObservable();

  // Окно настроек калькулятора: объявление
  public isSettingModalVisible = false;
  private settingModalVisibleSubject = new Subject<boolean>();
  settingModalVisibleObservable = this.settingModalVisibleSubject.asObservable();


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

  // Калькулятор: реализация
  emitCalculator(calculatorModal: [Calculator, string]) {
    this.calculatorSubject.next(calculatorModal);
  }

  // Окно статусов калькулятора: реализация
  emitStatusModalVisible() {
    this.isStatusModalVisible = !this.isStatusModalVisible;
    this.statusModalVisibleSubject.next(this.isStatusModalVisible);
  }

  // Окно настроек калькулятора: реализация
  emitSettingModalVisible() {
    this.isSettingModalVisible = !this.isSettingModalVisible;
    this.settingModalVisibleSubject.next(this.isSettingModalVisible);
  }

}
