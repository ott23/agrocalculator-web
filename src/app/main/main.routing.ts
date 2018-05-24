import {MainComponent} from './main.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthenticationGuard} from '../authentication/authentication.guard';
import {AuthenticationModule} from '../authentication/authentication.module';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AuthenticationModule
  ],
  exports: [
    RouterModule
  ]
})
export class MainRouting {
}
