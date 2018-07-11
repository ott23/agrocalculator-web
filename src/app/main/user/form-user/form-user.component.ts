import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../common/models/user.model';
import {UserService} from '../../../common/services/user.service';
import {SharedService} from '../../../shared.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {RolesEnum} from '../roles.enum';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnChanges {

  form: FormGroup;
  @Output() emitter = new EventEmitter<User>();
  @Input() user: User;
  roles = RolesEnum;
  roleKeys;

  constructor(private fb: FormBuilder, private userService: UserService, private sharedService: SharedService) {
  }

  ngOnChanges() {
    if (this.user.password == null) {
      this.form = this.fb.group({
        username: [this.user.username, Validators.required],
        password: [this.user.password, Validators.required],
        role: [this.user.role, Validators.required]
      });
    } else {
      this.form = this.fb.group({
        username: [this.user.username, Validators.required],
        password: [''],
        role: [this.user.role, Validators.required]
      });
    }
    this.roleKeys = Object.keys(this.roles);
  }

  save() {
    if (!this.form.valid) {
      alert('Введены некорректные данные');
      return;
    }
    this.sharedService.emitLoader(true);
    this.user.username = this.form.value.username;
    if (this.form.value.password !== '') {
      this.user.password = this.form.value.password;
    }
    this.user.role = this.form.value.role;

    this.userService.save(this.user).subscribe(() => {
      this.form.reset();
      this.emitter.emit();
    }, error => {
      switch (error.status) {
        case 409: {
          alert('Пользователь с таким именем уже существует');
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

