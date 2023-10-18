import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*,.?:;"-_=+|]).{8,32}$'
          ),
        ],
      ],
    });
  }

  onClickLogIn() {
    if (this.form.valid) {
      this._authService.initiateSubmit(this.form.value);
      this.form.reset();
    } else {
      this.form.updateValueAndValidity();
    }
  }

  onClickSignUp() {
    this.navigate('auth/register');
  }

  goToForgotPassword(event: Event) {
    event.preventDefault();
    this.navigate('auth/forgot');
  }

  navigate(path: string) {
    this._router.navigate([path], {
      skipLocationChange: true,
      queryParamsHandling: 'preserve',
    });
  }
}
