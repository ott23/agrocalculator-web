import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {MapService} from '../../common/services/map.service';
import { NavigationComponent } from './navigation/navigation.component';
import {ModalModule} from '../../common/components/modal/modal.module';
import { FormGeometryComponent } from './form-geometry/form-geometry.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GeometryListComponent } from './geometry-list/geometry-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [MapComponent, NavigationComponent, FormGeometryComponent, GeometryListComponent],
  providers: [MapService]
})
export class MapModule {
}
