import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';
import {UserService} from '../user.service';
import {MainService} from '../../main.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  @Output() userEmitter = new EventEmitter<User>();
  form: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private userService: UserService, private mainService: MainService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  addUser() {
    const val = this.form.value;
    this.mainService.emitLoaderStatus(true);
    try {
      this.isUserExistingByUsername(val.username).subscribe((bool) => {
        if (!this.form.valid) {
          alert('Введены некорректные данные');
          return;
        }
        if (bool) {
          alert('Пользователь с таким именем уже существует');
          return;
        }
        this.userEmitter.emit(new User(val.username, val.password));
      });
    } finally {
      this.mainService.emitLoaderStatus(false);
    }

  }

  isUserExistingByUsername(username): Observable<boolean> {
    return this.userService.getOneByUsername(username).pipe(
      map((user) => user != null),
      catchError(() => of(false))
    );
  }


}

