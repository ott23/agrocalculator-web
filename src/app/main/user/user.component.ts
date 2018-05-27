import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from './user.service';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Output() loaderStatusChanged = new EventEmitter<boolean>();

  userList = [];

  constructor(private userService: UserService, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.updateList();
  }

  /* add() {
    const val = this.form.value;
    if (val.username && val.password) {
      const user = new User(val.username, val.password);
      this.userService.create(user).subscribe(
        (user) => this.userList.push(user)
      );
    }
  } */

  deleteUser(user) {
    this.sharedService.emitLoaderStatus(true);
    this.userService.delete(user.id).subscribe(
      () => {
        this.userList = this.userList.filter((u) => u !== user);
        this.sharedService.emitLoaderStatus(false);
      }
    );
  }

  updateList() {
    this.sharedService.emitLoaderStatus(true);
    this.userService.getAll().subscribe(
      data => {
        this.userList = data;
        this.sharedService.emitLoaderStatus(false);
      }
    );
  }

}
