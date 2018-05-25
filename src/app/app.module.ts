import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from './app.routing';
import {AuthenticationModule} from './authentication/authentication.module';
import {LoginModule} from './login/login.module';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Interceptor} from './authentication/token.interceptor';
import {PreloadAllModules, RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    LoginModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
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
export class AppModule {
}
