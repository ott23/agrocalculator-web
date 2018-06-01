import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  menu = [{
    'title': 'Монитор',
    'icon': 'fa fa-desktop',
    'href': '#'
  }, {
    'title': 'Вычислители',
    'icon': 'fa fa-calculator',
    'href': '#'
  }, {
    'title': 'Карта',
    'icon': 'fa fa-map',
    'href': 'map'
  }, {
    'title': 'Пользователи',
    'icon': 'fa fa-users',
    'href': 'user'
  }, {
    'title': 'Параметры',
    'icon': 'fa fa-cog',
    'href': '#'
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
