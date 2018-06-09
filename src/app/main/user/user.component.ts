import {Component, OnInit, NgZone} from '@angular/core';
import {UserService} from './user.service';
import {SharedService} from '../../shared.service';
import {RolesEnum} from './roles.enum';
import {timer} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isAddUserModalVisible = false;
  userList = [];
  roles = RolesEnum;

  constructor(private userService: UserService, private sharedService: SharedService, private zone: NgZone) {
    this.sharedService.emitLoaderStatus(false);
    this.sharedService.addUserModalVisibleStatusObservable.subscribe(
      (addUserModalVisibleStatus) => this.isAddUserModalVisible = addUserModalVisibleStatus
    );
  }

  ngOnInit() {
    this.sharedService.emitLoaderStatus(true);
    this.refreshList();
    this.sharedService.emitLoaderStatus(false);
    timer(2000, 10000).subscribe(() => this.refreshList());
  }

  toggleAddUserModal() {
    this.sharedService.emitAddUserModalVisibleStatus();
  }

  refreshList() {
    this.userService.getAll().subscribe(
      (data) => {
        this.zone.run(() => {
          this.userList = data;
          this.sharedService.emitLoaderStatus(false);
        });
      }
    );
  }

  addUser(user) {
    this.sharedService.emitAddUserModalVisibleStatus();
    this.sharedService.emitLoaderStatus(true);
    this.userService.create(user).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoaderStatus(false);
    });
  }

  deleteUser(user) {
    this.sharedService.emitLoaderStatus(true);
    this.userService.delete(user.id).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoaderStatus(false);
    });
  }

}
