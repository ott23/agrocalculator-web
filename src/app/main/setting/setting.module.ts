import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingComponent} from './setting.component';
import {SharedService} from '../../shared.service';
import {SettingService} from '../../common/services/setting.service';
import {EditInTableModule} from '../../common/components/edit-in-table/edit-in-table.module';

@NgModule({
  imports: [
    CommonModule,
    EditInTableModule
  ],
  declarations: [SettingComponent],
  providers: [
    SettingService,
    SharedService
  ]
})
export class SettingModule { }
