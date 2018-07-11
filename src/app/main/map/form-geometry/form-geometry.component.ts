import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-geometry',
  templateUrl: './form-geometry.component.html',
  styleUrls: ['./form-geometry.component.scss']
})
export class FormGeometryComponent implements OnInit {

  @Output() geometryEmitter = new EventEmitter<any[]>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      geojson: ['', Validators.required]
    });
  }

  addGeometry() {
    if (!this.form.valid) {
      alert('Введены некорректные данные');
      return;
    }
    if (this.form.value.name === '') {
      this.form.value.name = 'Без названия';
    }
    this.geometryEmitter.emit([this.form.value.name, this.form.value.geojson]);
    this.form.reset();
  }

}
