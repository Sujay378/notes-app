import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alertType: string = 'alert-default';
  alertMessage: string = '';
  showModal: boolean = false;

  constructor(private _alertService: AlertService) {}

  ngOnInit(): void {
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
