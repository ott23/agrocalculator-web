import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MainRouting} from './main.routing';

@NgModule({
  imports: [
    CommonModule,
    MainRouting
  ],
  declarations: [MainComponent]
})
export class MainModule { }
