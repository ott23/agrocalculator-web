import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuard} from './authentication/authentication.guard';
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
    canActivate: [AuthenticationGuard],
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
