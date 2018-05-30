import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('modalWindowTrigger', [
      state('void', style({transform: 'translate(-50%, -50%) scale3d(.3, .3, .3)'})),
      state('*', style({transform: 'translate(-50%, -50%) scale3d(1, 1, 1)'})),
      transition('void <=> *', animate(200))
    ]),
    trigger('modalBackgroundTrigger', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 0.6})),
      transition('void <=> *', animate(200))
    ])
  ]
})
export class MainComponent implements OnInit {

  isSidebarActive: boolean;
  isLoadingActive: boolean;

  constructor(private auth: AuthenticationService,
              private router: Router,
              private sharedService: SharedService) {
    this.isSidebarActive = true;
    this.isLoadingActive = true;

    this.sharedService.loaderStatusObservable.subscribe(
      (loaderStatus) => this.isLoadingActive = loaderStatus
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
