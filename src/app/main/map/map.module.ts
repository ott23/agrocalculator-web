import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {MapService} from './map.service';
import { NavigationComponent } from './navigation/navigation.component';
import {ModalModule} from '../modal/modal.module';
import { AddGeometryComponent } from './add-geometry/add-geometry.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GeometryListComponent } from './geometry-list/geometry-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [MapComponent, NavigationComponent, AddGeometryComponent, GeometryListComponent],
  providers: [MapService]
})
export class MapModule {
}
