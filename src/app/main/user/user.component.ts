import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from './user.service';
import {MainService} from '../main.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Output() loaderStatusChanged = new EventEmitter<boolean>();

  isAddUserModalVisible = false;
  userList = [];

  constructor(private userService: UserService, private mainService: MainService) {
  }

  ngOnInit() {
    this.mainService.emitLoaderStatus(false);
    this.updateList();
  }

  toggleAddUserModal() {
    this.isAddUserModalVisible = !this.isAddUserModalVisible;
  }

  addUser(user) {
    this.toggleAddUserModal();
    this.mainService.emitLoaderStatus(true);
    this.userService.create(user).subscribe(
      (data) => {
        this.userList.push(data);
        this.mainService.emitLoaderStatus(false);
      }
    );
  }

  deleteUser(user) {
    this.mainService.emitLoaderStatus(true);
    this.userService.delete(user.id).subscribe(
      () => {
        this.userList = this.userList.filter((u) => u !== user);
        this.mainService.emitLoaderStatus(false);
      }
    );
  }

  updateList() {
    this.mainService.emitLoaderStatus(true);
    this.userService.getAll().subscribe(
      (data) => {
        this.userList = data;
        this.mainService.emitLoaderStatus(false);
      }
    );
  }

}
