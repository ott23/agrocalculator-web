import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../shared.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Client} from '../../../common/models/client.model';
import {ClientService} from '../../../common/services/client.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnChanges {

  form: FormGroup;
  @Output() emitter = new EventEmitter<Client>();
  @Input() client: Client;


  constructor(private fb: FormBuilder, private clientService: ClientService, private sharedService: SharedService) {
  }

  ngOnChanges() {
    this.form = this.fb.group({
      name: [this.client.name, Validators.required],
      password: [this.client.password, Validators.required]
    });
  }

  save() {
    if (!this.form.valid) {
      alert('Введены некорректные данные');
      return;
    }
    this.sharedService.emitLoader(true);
    this.client.name = this.form.value.name;
    this.client.password = this.form.value.password;
    this.clientService.save(this.client).subscribe(() => {
      this.form.reset();
      this.emitter.emit();
    }, error => {
      switch (error.status) {
        case 409: {
          alert('Клиент с таким именем уже существует');
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

