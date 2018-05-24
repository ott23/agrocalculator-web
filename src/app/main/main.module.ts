import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MainRouting} from './main.routing';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    MainRouting
  ],
  declarations: [MainComponent, MenuComponent]
})
export class MainModule { }
