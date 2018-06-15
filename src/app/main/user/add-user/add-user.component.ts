import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';
import {UserService} from '../user.service';
import {SharedService} from '../../../shared.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {RolesEnum} from '../roles.enum';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  @Output() userEmitter = new EventEmitter<User>();
  form: FormGroup;
  user: User;
  roles = RolesEnum;
  roleKeys;

  constructor(private fb: FormBuilder, private userService: UserService, private sharedService: SharedService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.roleKeys = Object.keys(this.roles);
  }

  addUser() {
    const val = this.form.value;
    this.sharedService.emitLoader(true);
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
        this.form.reset();
        this.userEmitter.emit(new User(val.username, val.password, val.role));
      });
    } finally {
      this.sharedService.emitLoader(false);
    }
  }

  isUserExistingByUsername(username): Observable<boolean> {
    return this.userService.getOneByUsername(username).pipe(
      map((user) => user != null),
      catchError(() => of(false))
    );
  }


}

