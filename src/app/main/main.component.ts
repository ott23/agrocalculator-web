import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isSidebarActive = true;

  constructor(private auth: AuthenticationService, private router: Router) { }

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
