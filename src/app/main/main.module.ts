import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MainRouting} from './main.routing';
import { MenuComponent } from './menu/menu.component';
import {BrowserModule} from '@angular/platform-browser';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MainRouting
  ],
  declarations: [MainComponent, MenuComponent, UsersComponent]
})
export class MainModule { }
