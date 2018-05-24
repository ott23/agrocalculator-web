import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu = [{
    'title': 'title1',
    'href': 'href1'
  }, {
    'title': 'title2',
    'href': 'href2'
  }, {
    'title': 'title3',
    'href': 'href3'
  }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isActive(location) {
    return location === this.router.url;
  }

}
