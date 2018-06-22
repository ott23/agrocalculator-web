import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorComponent} from './calculator.component';
import {CalculatorService} from '../../common/services/calculator.service';
import {SharedService} from '../../shared.service';
import {StatusComponent} from './status/status.component';
import {ModalModule} from '../../common/components/modal/modal.module';
import {LoaderModule} from '../../common/components/loader/loader.module';
import {SettingComponent} from './setting/setting.component';
import {SettingService} from '../../common/services/setting.service';
import {EditInTableModule} from '../../common/components/edit-in-table/edit-in-table.module';

@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    ModalModule,
    EditInTableModule
  ],
  declarations: [CalculatorComponent, StatusComponent, SettingComponent],
  providers: [
    CalculatorService,
    SettingService,
    SharedService
  ]
})
export class CalculatorModule { }
