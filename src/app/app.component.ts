import { Component, OnInit } from '@angular/core';
import { AppState } from './shared/models/store.model';
import { Store } from '@ngrx/store';
import { isAltertVisible } from './store';
import { AlertService } from './shared/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'notes';

  constructor(
    private store: Store<AppState>,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.store.select(isAltertVisible).subscribe((alertData) => {
      if (alertData.visible) {
        this._alertService.initiateAlert.emit({
          type: alertData.type,
          message: alertData.message,
        });
      } else {
        this._alertService.closeAlert.emit();
      }
    });
  }
}
