import {AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('contentTrigger', [
      state('sidebarOn', style({
        width: 'calc(100% - 200px)',
        marginLeft: '200px'
      }), {params: {sidebarWidth: '0'}}),
      state('sidebarOff', style({
        width: 'calc(100% - 50px)',
        marginLeft: '50px'
      }), {params: {sidebarWidth: '0'}}),
      transition('sidebarOn <=> sidebarOff', animate('500ms ease-in-out'))
    ]),
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

export class MainComponent implements AfterContentChecked {

  @ViewChild('sidebar') sidebar: ElementRef;
  sidebarWidth: number;

  isSidebarActive: boolean;
  isLoadingActive: boolean;

  constructor(private auth: AuthenticationService,
              private router: Router,
              private sharedService: SharedService) {
    this.isSidebarActive = false;
    this.isLoadingActive = true;

    this.sharedService.loaderStatusObservable.subscribe(
      (loaderStatus) => this.isLoadingActive = loaderStatus
    );
  }

  ngAfterContentChecked() {
    this.sidebarWidth = this.sidebar.nativeElement.offsetWidth;
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    console.log(this.isSidebarActive);
  }

  logout() {
    this.auth.doLogout();
    this.router.navigate(['../login']);
  }

}
