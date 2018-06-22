import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../common/services/user.service';
import {SharedService} from '../../shared.service';
import {RolesEnum} from './roles.enum';
import {timer} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  isAddUserModalVisible = false;
  userList = [];
  roles = RolesEnum;
  timer;

  constructor(private userService: UserService, private sharedService: SharedService) {
    this.sharedService.emitLoader(true);
    this.sharedService.addUserModalVisibleObservable.subscribe(
      (addUserModalVisibleStatus) => this.isAddUserModalVisible = addUserModalVisibleStatus
    );
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
    this.refreshList();
    this.timer = timer(2000, 2000).subscribe(() => this.refreshList());
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  toggleAddUserModal() {
    this.sharedService.emitAddUserModalVisible();
  }

  refreshList() {
    this.userService.getAll().subscribe(
      (data) => {
        this.userList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  addUser(user) {
    this.toggleAddUserModal();
    this.sharedService.emitLoader(true);
    this.userService.create(user).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

  deleteUser(user) {
    this.sharedService.emitLoader(true);
    this.userService.delete(user.id).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

}
