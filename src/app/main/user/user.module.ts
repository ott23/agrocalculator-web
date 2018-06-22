import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '../../common/components/loader/loader.module';
import {UserService} from '../../common/services/user.service';
import {SharedService} from '../../shared.service';
import {ModalModule} from '../../common/components/modal/modal.module';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    ModalModule
  ],
  exports: [UserComponent],
  declarations: [UserComponent, AddUserComponent],
  providers: [
    UserService,
    SharedService
  ]
})
export class UserModule { }
