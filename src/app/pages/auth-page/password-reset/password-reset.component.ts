import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { generateNewPassword } from '../../../shared/types/form-types';
import { passwordEqualityValidator } from 'src/app/shared/validators/custom-validators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ResetPassword } from 'src/app/shared/models/payload.model';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit, AfterViewInit {
  form!: generateNewPassword;
  constructor(private fb: FormBuilder, private _authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*,.?:;"-_=+|]).{8,32}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.form
      .get('confirmPassword')
      ?.addValidators(passwordEqualityValidator(this.form));
  }

  checkForError(path: string, errorType: string) {
    return this.form.get(path)?.hasError(errorType);
  }

  reset() {
    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      this._authService.resetPassword(
        new ResetPassword(
          this.form.value.password,
          this.form.value.confirmPassword
        )
      );
      this.reset();
    } else {
      this.form.updateValueAndValidity();
    }
  }
}
