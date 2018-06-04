import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SharedService {

  // Анимация загрузки: объявление
  private loaderStatus = new Subject<boolean>();
  loaderStatusObservable = this.loaderStatus.asObservable();

  // Окно добавления пользователя: объявление
  private isAddUserModalVisible = false;
  private addUserModalVisibleStatus = new Subject<boolean>();
  addUserModalVisibleStatusObservable = this.addUserModalVisibleStatus.asObservable();

  // Окно импорта GeoJSON: объявление
  private isAddGeometryModalVisible = false;
  private addGeometryModalVisibleStatus = new Subject<boolean>();
  addGeometryModalVisibleStatusObservable = this.addGeometryModalVisibleStatus.asObservable();

  // Окно списка гео: объявление
  private isGeometryListModalVisible = false;
  private geometryListModalVisibleStatus = new Subject<boolean>();
  geometryListModalVisibleStatusObservable = this.geometryListModalVisibleStatus.asObservable();


  // Анимация загрзуки: реализация
  emitLoaderStatus(loaderStatus: boolean) {
    this.loaderStatus.next(loaderStatus);
  }

  // Окно добавления пользователя: реализация
  emitAddUserModalVisibleStatus() {
    this.isAddUserModalVisible = !this.isAddUserModalVisible;
    this.addUserModalVisibleStatus.next(this.isAddUserModalVisible);
  }

  // Окно импорта GeoJSON: реализация
  emitAddGeometryModalVisibleStatus() {
    this.isAddGeometryModalVisible = !this.isAddGeometryModalVisible;
    this.addGeometryModalVisibleStatus.next(this.isAddGeometryModalVisible);
  }

  // Окно списка гео: реализация
  emitGeometryListModalVisibleStatus() {
    this.isGeometryListModalVisible = !this.isGeometryListModalVisible;
    this.geometryListModalVisibleStatus.next(this.isGeometryListModalVisible);
  }
}
