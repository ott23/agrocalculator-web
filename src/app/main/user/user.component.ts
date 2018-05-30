import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from './user.service';
import {SharedService} from '../shared.service';
import {User} from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Output() loaderStatusChanged = new EventEmitter<boolean>();

  isAddUserModalVisible = false;
  userList = [];

  constructor(private userService: UserService, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.updateList();
  }

  toggleAddUserModal() {
    this.isAddUserModalVisible = !this.isAddUserModalVisible;
  }

  addUser(user) {
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

  updateList() {
    this.sharedService.emitLoaderStatus(true);
    this.userService.getAll().subscribe(
      (data) => {
        this.userList = data;
        this.sharedService.emitLoaderStatus(false);
      }
    );
  }

}
