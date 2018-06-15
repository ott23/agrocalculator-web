import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingComponent} from './setting.component';
import {SharedService} from '../../shared.service';
import {SettingService} from './setting.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SettingComponent],
  providers: [
    SettingService,
    SharedService
  ]
})
export class SettingModule { }
