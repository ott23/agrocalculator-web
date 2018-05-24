import {AuthenticationService} from './authentication.service';
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  canActivate() {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
