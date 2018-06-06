import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {UserComponent} from './user/user.component';
import {MapComponent} from './map/map.component';
import {RoleGuard} from '../security/role.guard';

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
