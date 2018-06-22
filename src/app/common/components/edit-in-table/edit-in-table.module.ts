import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditInTableComponent} from './edit-in-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EditInTableComponent
  ],
  declarations: [EditInTableComponent]
})
export class EditInTableModule{}
