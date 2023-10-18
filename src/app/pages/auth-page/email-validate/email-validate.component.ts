import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

type forgotPasswordForm = FormGroup<{
  email: FormControl;
}>;

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.css'],
})
export class EmailValidateComponent {
  form!: forgotPasswordForm;

  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    this.form.valid && console.log(this.form.value);
  }
}
