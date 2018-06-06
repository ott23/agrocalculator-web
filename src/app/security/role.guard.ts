import {SecurityService} from './security.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private location: Location,
    private authenticationService: SecurityService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {

    const expectedRole = route.data.expectedRole;
    const role = JSON.parse(localStorage.getItem('user')).authority;

    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRole !== role) {
      alert('Доступ запрещён');
      this.location.back();
    }

    return true;
  }

}
