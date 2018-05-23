import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRouting} from './app.routing';
import {AuthenticationModule} from './authentication/authentication.module';
import {MainModule} from './main/main.module';
import {LoginModule} from './login/login.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Interceptor} from './authentication/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    LoginModule,
    AuthenticationModule,
    AppRouting
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
