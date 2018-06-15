import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {UserComponent} from './user/user.component';
import {MapComponent} from './map/map.component';
import {RoleGuard} from '../security/role.guard';
import {CalculatorComponent} from './calculator/calculator.component';
import {SettingComponent} from './setting/setting.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'map'
      },
      {
        path: 'calculator',
        component: CalculatorComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_ADMIN'
        },
      },
      {
        path: 'setting',
        component: SettingComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_ADMIN'
        },
      },
      {
        path: 'map',
        component: MapComponent,
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_ADMIN'
        }
      }
    ]
  }
];
