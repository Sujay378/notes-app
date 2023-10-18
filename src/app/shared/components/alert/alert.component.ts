import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AppState } from '../../models/store.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAppProcessing } from 'src/app/store';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alertType: string = 'alert-default';
  alertMessage: string = '';
  showModal: boolean = false;
  isAppProccesing$!: Observable<boolean>;

  constructor(
    private _alertService: AlertService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isAppProccesing$ = this.store.select(isAppProcessing);

    this._alertService.initiateAlert.subscribe((config) => {
      this.alertType = `alert-${config.type || 'default'}`;
      this.alertMessage = config.message;
      this.showModal = true;
    });

    this._alertService.closeAlert.subscribe((value) => {
      this.alertMessage = '';
      this.alertType = 'alert-default';
      this.showModal = false;
    });
  }

  closeModal() {
    this._alertService.closeAlert.emit();
  }
}
