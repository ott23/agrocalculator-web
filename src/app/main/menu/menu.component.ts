import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu = [{
    'title': '<i class="fa fa-desktop"></i> <span>Монитор</span>',
    'href': '#'
  }, {
    'title': '<i class="fa fa-calculator"></i> <span>Вычислители</span>',
    'href': '#'
  }, {
    'title': '<i class="fa fa-map"></i> <span>Инструменты карты</span>',
    'href': '#'
  }, {
    'title': '<i class="fa fa-users"></i> <span>Пользователи</span>',
    'href': 'user'
  }, {
    'title': '<i class="fa fa-cog"></i> <span>Параметры</span>',
    'href': '#'
  }];


  constructor() {
  }

  ngOnInit() {
  }

}
