import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../shared.service';
import {Geozone} from '../../../common/models/geozone.model';
import {GeozoneService} from '../../../common/services/geozone.service';

@Component({
  selector: 'app-form-geozone',
  templateUrl: './form-geozone.component.html',
  styleUrls: ['./form-geozone.component.scss']
})
export class FormGeozoneComponent implements OnChanges {

  form: FormGroup;
  @Output() emitter = new EventEmitter<Geozone>();
  @Input() geozone: Geozone;

  constructor(private fb: FormBuilder, private geozoneService: GeozoneService, private sharedService: SharedService) {
  }

  ngOnChanges() {
    this.form = this.fb.group({
      name: [this.geozone.name, Validators.required],
      geometry: [this.geozone.geometry, Validators.required],
      client: [this.geozone.client, Validators.required],
    });
  }

  save() {
    console.log(this.form);

    if (!this.form.valid) {
      alert('Введены некорректные данные');
      return;
    }
    this.sharedService.emitLoader(true);
    this.geozone.name = this.form.value.name;
    this.geozone.geometry = this.form.value.geometry;
    this.geozone.client = this.form.value.client;
    this.geozoneService.save(this.geozone).subscribe(() => {
      this.form.reset();
      this.emitter.emit();
    }, error => {
      switch (error.status) {
        case 409: {
          alert('Объект с таким именем уже существует');
          break;
        }
        case 424: {
          alert('Клиент с таким UUID не существует');
          break;
        }
        case 400: {
          alert('Ошибка сервера: ' + error.error.response);
          break;
        }
        default: {
          alert('Неизвестная ошибка');
          break;
        }
      }
    });
    this.sharedService.emitLoader(false);
  }

}
