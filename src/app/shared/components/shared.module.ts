import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from './alert/alert.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ModalComponent } from './modal/modal.component';
import { NoteTitlePromptComponent } from './modal/note-title-prompt/note-title-prompt.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    AlertComponent,
    ModalComponent,
    NoteTitlePromptComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent,
    AlertComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class SharedModule {}
