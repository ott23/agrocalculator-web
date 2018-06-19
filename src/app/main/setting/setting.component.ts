import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {SharedService} from '../../shared.service';
import {SettingService} from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {

  settingList = [];
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

}
