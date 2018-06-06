import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../security/security.service';
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

  isLoadingActive: boolean;
  isErrorActive: boolean;

  constructor(private fb: FormBuilder,
              private auth: SecurityService,
              private router: Router,
              private route: ActivatedRoute) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = null;
    this.isLoadingActive = false;
    this.isErrorActive = false;
  }

  ngOnInit() {
    this.redirect = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl(this.redirect);
    }
  }

  submit() {
    console.log('Submitting login form');
    const val = this.form.value;

    this.reset();

    if (this.form.valid) {
      this.isLoadingActive = true;
      this.auth.doLogin(val).subscribe(
        () => {
          this.isLoadingActive = false;
          this.router.navigateByUrl(this.redirect);
        },
        (error) => {
          this.isLoadingActive = false;
          this.isErrorActive = true;
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
      this.isErrorActive = true;
      this.error = 'Введены некорректные данные';
    }
  }

  reset() {
    this.error = null;
    this.isLoadingActive = false;
    this.isErrorActive = false;
  }

}
