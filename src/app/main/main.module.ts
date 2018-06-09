import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserModule} from './user/user.module';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {MenuComponent} from './menu/menu.component';
import {mainRoutes} from './main.routing';
import {LoaderModule} from '../loader/loader.module';
import {SharedService} from '../shared.service';
import {MapModule} from './map/map.module';
import {CalculatorModule} from './calculator/calculator.module';

@NgModule({
  imports: [
    CommonModule,
    CalculatorModule,
    MapModule,
    UserModule,
    LoaderModule,
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [
    MainComponent,
    MenuComponent
  ],
  providers: [
    SharedService
  ]
})
export class MainModule {
}
