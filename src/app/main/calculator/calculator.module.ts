import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import {CalculatorService} from './calculator.service';
import {SharedService} from '../../shared.service';
import { StatusComponent } from './status/status.component';
import {ModalModule} from '../modal/modal.module';
import {LoaderModule} from '../../loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    ModalModule
  ],
  declarations: [CalculatorComponent, StatusComponent],
  providers: [
    CalculatorService,
    SharedService
  ]
})
export class CalculatorModule { }
