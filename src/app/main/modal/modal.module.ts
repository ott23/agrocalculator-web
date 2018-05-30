import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from './modal.component';
import {ModalService} from './modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent
  ],
  providers: [
    ModalService
  ],
  declarations: [
    ModalComponent
  ]
})
export class ModalModule { }
