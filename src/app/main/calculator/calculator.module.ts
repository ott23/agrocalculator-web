import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import {CalculatorService} from './calculator.service';
import {SharedService} from '../../shared.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CalculatorComponent],
  providers: [
    CalculatorService,
    SharedService
  ]
})
export class CalculatorModule { }
