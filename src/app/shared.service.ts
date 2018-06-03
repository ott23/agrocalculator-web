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
  private isAddGeoModalVisible = false;
  private addGeoModalVisibleStatus = new Subject<boolean>();
  addGeoModalVisibleStatusObservable = this.addGeoModalVisibleStatus.asObservable();


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
  emitAddGeoModalVisibleStatus() {
    this.isAddGeoModalVisible = !this.isAddGeoModalVisible;
    this.addGeoModalVisibleStatus.next(this.isAddGeoModalVisible);
  }
}
