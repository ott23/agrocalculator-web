import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('menuTrigger', [
      state('*', style({
        width: '150px',
        paddingLeft: '10px'
      })),
      state('void', style({
        width: '0',
        paddingLeft: '0'
      })),
      transition('void <=> *', animate('500ms ease-in-out'))
    ])
  ]
})
export class MenuComponent implements OnInit {

  @Input() isSidebarActive;

  menu = AppConfig.mainMenu;

  constructor() {
  }

  ngOnInit() {
  }

}
