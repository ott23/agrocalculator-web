import {SecurityService} from './security.service';
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class CommonGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: SecurityService) {
  }

  canActivate() {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
