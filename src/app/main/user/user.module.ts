import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '../../loader/loader.module';
import {UserService} from './user.service';
import {SharedService} from '../shared.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule
  ],
  exports: [UserComponent],
  declarations: [UserComponent],
  providers: [
    UserService,
    SharedService
  ]
})
export class UserModule { }
