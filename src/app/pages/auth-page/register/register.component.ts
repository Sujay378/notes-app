import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { checkOnlyCharacters } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.form = fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(5), checkOnlyCharacters()],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*,.?:;"-_=+|]).{8,32}$'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this._authService.loginError.subscribe((message) => {
      this.displayError(message);
    });
  }

  checkForError(path: string, errorType?: string) {
    if (errorType) return this.form.get(path)?.hasError(errorType);
    return this.form.get(path)?.valid;
  }

  onClickSignUp() {
    if (this.form.valid) {
      this._authService.initiateSubmit(this.form.value);
      this.form.reset();
    } else {
      this.form.updateValueAndValidity();
    }
  }

  onClickLogIn() {
    this.navigator('auth/login');
  }

  displayError(message: string) {
    this.showError = true;
    this.errorMessage = message;
  }

  navigator(path: string) {
    this._router.navigate([path], {
      skipLocationChange: true,
      queryParamsHandling: 'preserve',
    });
  }
}
