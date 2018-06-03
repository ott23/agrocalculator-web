import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-geo',
  templateUrl: './add-geo.component.html',
  styleUrls: ['./add-geo.component.scss']
})
export class AddGeoComponent implements OnInit {

  @Output() geoEmitter = new EventEmitter<string>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      geojson: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addGeo() {
    const val = this.form.value;
    if (!this.form.valid) {
      alert('Введены некорректные данные');
      return;
    }
    this.geoEmitter.emit(val.geojson);
  }

}
