import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../common/services/user.service';
import {SharedService} from '../../shared.service';
import {RolesEnum} from './roles.enum';
import {Subscription, timer} from 'rxjs';
import {User} from '../../common/models/user.model';
import {Client} from '../../common/models/client.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  isUserModalVisible = false;
  userList: User[] = [];
  user: User = new User();
  roles = RolesEnum;
  timer: Subscription;

  constructor(private userService: UserService, private sharedService: SharedService) {
    this.sharedService.emitLoader(true);
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
    this.refreshList();
    this.timer = timer(2000, 2000).subscribe(() => this.refreshList());
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  track(index: number, user: User): number {
    return user.id;
  }

  closeUserModal() {
    this.toggleUserModal();
    this.refreshList();
  }

  toggleUserModal() {
    this.isUserModalVisible = !this.isUserModalVisible;
  }

  refreshList() {
    this.userService.getAll().subscribe(
      (data) => {
        this.userList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  add() {
    this.user = new User();
    this.toggleUserModal();
  }

  edit(user) {
    this.user = user;
    this.toggleUserModal();
  }

  save(user) {
    this.toggleUserModal();
    this.sharedService.emitLoader(true);
    this.userService.save(user).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

  delete(user) {
    this.sharedService.emitLoader(true);
    this.userService.delete(user.id).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

}
