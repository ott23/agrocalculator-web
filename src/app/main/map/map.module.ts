import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {MapService} from './map.service';
import { NavigationComponent } from './navigation/navigation.component';
import {ModalModule} from '../modal/modal.module';
import { AddGeoComponent } from './add-geo/add-geo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [MapComponent, NavigationComponent, AddGeoComponent],
  providers: [MapService]
})
export class MapModule {
}
