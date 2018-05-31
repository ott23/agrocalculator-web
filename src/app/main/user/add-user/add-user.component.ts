import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  @Output() userEmitter = new EventEmitter<User>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  addUser() {
    const val = this.form.value;
    if (val.username && val.password) {
      const user = new User(val.username, val.password);
      this.userEmitter.emit(user);
    }
  }

}
