import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalParams } from 'src/app/shared/models/prompt.model';
import { AppState } from 'src/app/shared/models/store.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormValidatorService } from 'src/app/shared/validators/form-validator.service';
import { getAllGuestNoteTitles, isUserLogged } from 'src/app/store';

@Component({
  selector: 'app-note-title-prompt',
  templateUrl: './note-title-prompt.component.html',
  styleUrls: ['./note-title-prompt.component.css'],
})
export class NoteTitlePromptComponent implements OnInit, AfterViewInit {
  @Input('noteTitleParams') params!: ModalParams;

  titleControl!: FormControl;
  userLogged: boolean = false;
  invaliTitles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private _validatorService: FormValidatorService,
    private store: Store<AppState>,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.titleControl = this.fb.control(['', [Validators.required]]);
    this.store
      .select(isUserLogged)
      .subscribe((isUserLogged) => (this.userLogged = isUserLogged))
      .unsubscribe();
    this.store
      .select(getAllGuestNoteTitles)
      .subscribe((guestTitles) => (this.invaliTitles = [...guestTitles]))
      .unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.userLogged)
      this.titleControl.addAsyncValidators(
        this._validatorService.checkUniqueTitle(500)
      );
    else
      this.titleControl.addValidators(
        this._validatorService.checkIfValueInvalid(this.invaliTitles)
      );
  }

  create() {
    if (this.titleControl.valid && !this.titleControl.pending) {
      if (this.params.primaryCallback)
        this.params.primaryCallback(this.titleControl.value);
      this.cancel();
    } else this.titleControl.updateValueAndValidity();
  }

  cancel() {
    this._alertService.closeModal.emit();
  }
}
