import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from './user.service';
import {SharedService} from '../shared.service';
import {User} from './user.model';
import {ModalService} from '../modal/modal.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Output() loaderStatusChanged = new EventEmitter<boolean>();

  userList = [];

  constructor(private userService: UserService, private modalService: ModalService, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.updateList();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addUser(user) {
    this.userService.create(user).subscribe(
      (user) => this.userList.push(user)
    );
    this.closeModal('add-user');
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
      data => {
        this.userList = data;
        this.sharedService.emitLoaderStatus(false);
      }
    );
  }

}
