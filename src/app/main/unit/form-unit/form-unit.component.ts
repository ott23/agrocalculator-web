import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../shared.service';
import {UnitService} from '../../../common/services/unit.service';
import {Unit} from '../../../common/models/unit.model';

@Component({
  selector: 'app-form-unit',
  templateUrl: './form-unit.component.html',
  styleUrls: ['./form-unit.component.scss']
})
export class FormUnitComponent implements OnChanges {

  form: FormGroup;
  @Output() emitter = new EventEmitter<Unit>();
  @Input() unit: Unit;

  constructor(private fb: FormBuilder, private unitService: UnitService, private sharedService: SharedService) {
  }

  ngOnChanges() {
    this.form = this.fb.group({
      name: [this.unit.name, Validators.required],
      imei: [this.unit.imei, Validators.required],
      client: [this.unit.client, Validators.required],
    });
  }

  save() {
    if (!this.form.valid) {
      alert('Введены некорректные данные');
      return;
    }
    this.sharedService.emitLoader(true);
    this.unit.name = this.form.value.name;
    this.unit.imei = this.form.value.imei;
    this.unit.client = this.form.value.client;
    this.unitService.save(this.unit).subscribe(() => {
      this.form.reset();
      this.emitter.emit();
    }, error => {
      switch (error.status) {
        case 409: {
          alert('Объект с таким именем или IMEI уже существует');
          break;
        }
        case 424: {
          alert('Клиент с таким UUID не существует');
          break;
        }
        case 400: {
          alert('Ошибка сервера, возможно введён некорректный UUID');
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
