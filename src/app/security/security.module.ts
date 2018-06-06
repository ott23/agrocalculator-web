import {NgModule} from '@angular/core';
import {CommonGuard} from './common.guard';
import {SecurityService} from './security.service';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {RoleGuard} from './role.guard';

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule
  ],
  providers: [
    CommonGuard,
    RoleGuard,
    SecurityService
  ]
})
export class SecurityModule {
}
