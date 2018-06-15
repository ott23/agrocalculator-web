import {Component, NgZone, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import {SharedService} from '../../shared.service';
import {SettingService} from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  settingList = [];

  constructor(private settingService: SettingService, private sharedService: SharedService, private zone: NgZone) {
    this.sharedService.emitLoader(true);
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
    this.refreshList();
    timer(10000, 10000).subscribe(() => this.refreshList());
  }

  refreshList() {
    this.settingService.getAll().subscribe(
      (data) => {
        this.zone.run(() => {
          this.settingList = data;
          this.sharedService.emitLoader(false);
        });
      }
    );
  }

}
