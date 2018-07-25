import {Component, OnDestroy, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import {SharedService} from '../../shared.service';
import {SettingService} from '../../common/services/setting.service';
import {Setting} from '../../common/models/setting.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {

  settingList: Setting[] = [];
  editedSettingId = null;
  timer;

  constructor(private settingService: SettingService, private sharedService: SharedService) {
    this.sharedService.emitLoader(true);
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
    this.refreshList();
    this.timer = timer(2000, 2000).subscribe(() => this.refreshList());
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  refreshList() {
    this.settingService.getAll().subscribe(
      (data) => {
        this.settingList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  track(index: number, setting: Setting): number {
    return setting.id;
  }

  setEditedId(id: number) {
    this.editedSettingId = id;
  }

  setEditedValue(setting: Setting, value: string) {
    setting.value = value;
    this.setEditedId(null);
    this.sharedService.emitLoader(true);
    this.settingService.setEditedValue(setting).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

  delete(id: number) {
    this.sharedService.emitLoader(true);
    this.settingService.deleteSetting(id).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

}
