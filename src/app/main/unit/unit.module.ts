import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitComponent} from './unit.component';
import {FormUnitComponent} from './form-unit/form-unit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '../../common/components/loader/loader.module';
import {ModalModule} from '../../common/components/modal/modal.module';
import {SharedService} from '../../shared.service';
import {UnitService} from '../../common/services/unit.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    ModalModule
  ],
  exports: [UnitComponent],
  declarations: [UnitComponent, FormUnitComponent],
  providers: [
    UnitService,
    SharedService
  ]
})
export class UnitModule { }
