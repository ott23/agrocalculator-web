import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {UserComponent} from './user/user.component';
import {MapComponent} from './map/map.component';
import {RoleGuard} from '../security/role.guard';
import {NodeComponent} from './node/node.component';
import {SettingComponent} from './setting/setting.component';
import {ClientComponent} from './client/client.component';
import {UnitComponent} from './unit/unit.component';

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
        path: 'node',
        component: NodeComponent,
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
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_ADMIN'
        }
      },
      {
        path: 'unit',
        component: UnitComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_ADMIN'
        }
      }
    ]
  }
];
