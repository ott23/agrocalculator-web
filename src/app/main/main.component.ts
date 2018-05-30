import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isSidebarActive: boolean;
  isLoaderActive: boolean;

  constructor(private auth: AuthenticationService,
              private router: Router,
              private sharedService: SharedService) {
    this.isSidebarActive = true;
    this.isLoaderActive = true;

    this.sharedService.loaderStatusObservable.subscribe(
      (loaderStatus) => this.isLoaderActive = loaderStatus
    );
  }

  ngOnInit() {

  }

  toogleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  logout() {
    this.auth.doLogout();
    this.router.navigate(['../login']);
  }

}
