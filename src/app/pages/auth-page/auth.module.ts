import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EmailValidateComponent } from './email-validate/email-validate.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { StandbyComponent } from './standby/standby.component';
import { SharedModule } from 'src/app/shared/components/shared.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    EmailValidateComponent,
    PasswordResetComponent,
    StandbyComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
