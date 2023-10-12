import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$'
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

  register() {
    if (this.form.valid) {
      this._authService.initiateSubmit(this.form.value);
      this.form.reset();
    } else {
      this.form.updateValueAndValidity();
    }
  }

  displayError(message: string) {
    this.showError = true;
    this.errorMessage = message;
  }
}
