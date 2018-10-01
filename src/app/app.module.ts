import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from './app.routing';
import {SecurityModule} from './security/security.module';
import {LoginModule} from './login/login.module';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SecurityInterceptor} from './security/security.interceptor';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from './common/services/configuration.service';


export function init_app(configurationService: ConfigurationService) {
  return () => {
    return configurationService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SecurityModule,
    LoginModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
    ConfigurationService,
    {
      'provide': APP_INITIALIZER,
      'useFactory': init_app,
      'deps': [ConfigurationService],
      'multi': true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
