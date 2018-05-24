import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {isNull} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redirect: string;
  error: string;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  ngOnInit() {
    this.redirect = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl(this.redirect);
    }
  }

  submit() {
    this.error = null;
    const val = this.form.value;

    if (this.form.valid) {
      this.auth.doLogin(val).subscribe(
        () => {
          this.router.navigateByUrl(this.redirect);
        },
        (error) => {
          switch (error.status) {
            case 0: {
              this.error = 'Сервер не отвечает';
              break;
            }
            case 403: {
              this.error = 'Неверный логин или пароль';
              break;
            }
            default: {
              this.error = 'Ошибка авторизации';
              break;
            }
          }
        }
      );
    } else {
      this.error = 'Введены некорректные данные';
    }
  }

  reset() {
    this.error = null;
  }

  isNull(value) {
    return isNull(value);
  }

}
