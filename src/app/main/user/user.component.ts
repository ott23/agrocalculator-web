import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {SharedService} from '../../shared.service';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isAddUserModalVisible = false;
  userList = [];

  constructor(private userService: UserService, private sharedService: SharedService) {
    this.sharedService.emitLoaderStatus(true);
    this.sharedService.addUserModalVisibleStatusObservable.subscribe(
      (addUserModalVisibleStatus) => this.isAddUserModalVisible = addUserModalVisibleStatus
    );
  }

  ngOnInit() {
    this.sharedService.emitLoaderStatus(true);
    this.userService.getAll().subscribe(
      (data) => {
        this.userList = data;
        this.sharedService.emitLoaderStatus(false);
      }
    );
  }

  toggleAddUserModal() {
    this.sharedService.emitAddUserModalVisibleStatus();
  }

  addUser(user) {
    this.sharedService.emitAddUserModalVisibleStatus();
    this.sharedService.emitLoaderStatus(true);
    this.userService.create(user).subscribe(
      (data) => {
        this.userList.push(data);
        this.sharedService.emitLoaderStatus(false);
      }
    );
  }

  deleteUser(user) {
    this.sharedService.emitLoaderStatus(true);
    this.userService.delete(user.id).subscribe(
      () => {
        this.userList = this.userList.filter((u) => u !== user);
        this.sharedService.emitLoaderStatus(false);
      }
    );
  }

}
