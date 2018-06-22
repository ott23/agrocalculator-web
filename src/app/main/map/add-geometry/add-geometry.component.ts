import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-geometry',
  templateUrl: './add-geometry.component.html',
  styleUrls: ['./add-geometry.component.scss']
})
export class AddGeometryComponent implements OnInit {

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
    const val = this.form.value;
    if (!this.form.valid) {
      alert('Введены некорректные данные');
      return;
    }
    if (val.name === '') {
      val.name = 'Без названия';
    }
    this.form.reset();
    this.geometryEmitter.emit([val.name, val.geojson]);
  }

}
