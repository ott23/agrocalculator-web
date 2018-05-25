import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {MainRouting} from './main/main.routing';
import {UserComponent} from './main/user/user.component';
import {MainComponent} from './main/main.component';
import {AuthenticationGuard} from './authentication/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
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
