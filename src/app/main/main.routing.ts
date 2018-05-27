import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {UserComponent} from './user/user.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user'
      },
      {
        path: 'user',
        component: UserComponent,
      }
    ]
  }
];
