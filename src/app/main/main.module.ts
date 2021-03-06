import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserModule} from './user/user.module';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {MenuComponent} from './menu/menu.component';
import {mainRoutes} from './main.routing';
import {LoaderModule} from '../common/components/loader/loader.module';
import {SharedService} from '../shared.service';
import {MapModule} from './map/map.module';
import {NodeModule} from './node/node.module';
import {SettingModule} from './setting/setting.module';
import {ClientModule} from './client/client.module';
import {UnitModule} from './unit/unit.module';
import {GeozoneModule} from './geozone/geozone.module';

@NgModule({
  imports: [
    CommonModule,
    NodeModule,
    SettingModule,
    MapModule,
    UserModule,
    ClientModule,
    UnitModule,
    GeozoneModule,
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
