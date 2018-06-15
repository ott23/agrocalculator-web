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
    this.sharedService.emitLoader(true);
    this.sharedService.addUserModalVisibleSubjectObservable.subscribe(
      (addUserModalVisibleStatus) => this.isAddUserModalVisible = addUserModalVisibleStatus
    );
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
    this.refreshList();
    timer(10000, 10000).subscribe(() => this.refreshList());
  }

  toggleAddUserModal() {
    this.sharedService.emitAddUserModalVisible();
  }

  refreshList() {
    this.userService.getAll().subscribe(
      (data) => {
        this.zone.run(() => {
          this.userList = data;
          this.sharedService.emitLoader(false);
        });
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
