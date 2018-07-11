import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientComponent} from './client.component';
import {SharedService} from '../../shared.service';
import {ClientService} from '../../common/services/client.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '../../common/components/loader/loader.module';
import {ModalModule} from '../../common/components/modal/modal.module';
import {FormClientComponent} from './form-client/form-client.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    ModalModule
  ],
  exports: [ClientComponent],
  declarations: [ClientComponent, FormClientComponent],
  providers: [
    ClientService,
    SharedService
  ]
})
export class ClientModule { }
