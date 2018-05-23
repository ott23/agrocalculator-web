import {NgModule} from '@angular/core';
import {AuthenticationGuard} from './authentication.guard';
import {AuthenticationService} from './authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService
  ]
})
export class AuthenticationModule {
}
