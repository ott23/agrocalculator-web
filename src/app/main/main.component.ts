import {AfterContentChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {SecurityService} from '../security/security.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
import {animate, group, query, state, style, transition, trigger} from '@angular/animations';
import {RolesEnum} from './user/roles.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('enterLeaveAnimationTrigger', [
      transition('* => *', [
        query(':enter, :leave',
          style({position: 'fixed', width: '100%', height: '100%'})
          , {optional: true}),
        query('.sidebarOn :enter, .sidebarOn :leave',
          style({width: 'calc(100% - 200px)'})
          , {optional: true}),
        query('.sidebarOff :enter, .sidebarOff :leave',
          style({width: 'calc(100% - 50px)'})
          , {optional: true}),
        group([
          query(':enter', [
            style({opacity: '0'}),
            animate('0.5s ease-in-out', style({opacity: '1'}))
          ], {optional: true}),
          query(':leave', [
            style({opacity: '1'}),
            animate('0.3s ease-in-out', style({opacity: '0'}))
          ], {optional: true}),
        ])
      ])
    ]),
    trigger('contentTrigger', [
      state('sidebarOn', style({
        width: 'calc(100% - 200px)',
        marginLeft: '200px'
      })),
      state('sidebarOff', style({
        width: 'calc(100% - 50px)',
        marginLeft: '50px'
      })),
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

  isSidebarActive = false;
  isLoadingActive = true;

  currentUser;
  roles = RolesEnum;

  constructor(private auth: SecurityService,
              private router: Router,
              private sharedService: SharedService) {
    this.sharedService.loaderObservable.subscribe(
      (loaderStatus) => this.isLoadingActive = loaderStatus
    );
    if (localStorage.getItem('user') != null) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  ngAfterContentChecked() {
    this.sidebarWidth = this.sidebar.nativeElement.offsetWidth;
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  logout() {
    this.auth.doLogout();
    this.router.navigate(['../login']);
  }

}
