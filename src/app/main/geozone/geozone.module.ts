import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderModule} from '../../common/components/loader/loader.module';
import {ModalModule} from '../../common/components/modal/modal.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedService} from '../../shared.service';
import {GeozoneComponent} from './geozone.component';
import {FormGeozoneComponent} from './form-geozone/form-geozone.component';
import {GeozoneService} from '../../common/services/geozone.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    ModalModule
  ],
  exports: [GeozoneComponent],
  declarations: [GeozoneComponent, FormGeozoneComponent],
  providers: [
    GeozoneService,
    SharedService
  ]
})
export class GeozoneModule {
}
