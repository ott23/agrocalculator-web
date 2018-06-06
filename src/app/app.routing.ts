import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {CommonGuard} from './security/common.guard';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    canActivate: [CommonGuard],
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
