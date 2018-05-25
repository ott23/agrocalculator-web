import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserModule} from './user/user.module';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {MenuComponent} from './menu/menu.component';
import {mainRoutes} from './main.routing';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [MainComponent, MenuComponent]
})
export class MainModule {
}
