import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/store.model';
import { showAlert } from 'src/app/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private store: Store<AppState>) {}

  openModal() {
    this.store.dispatch(
      showAlert({
        payload: {
          type: 'success',
          message: 'backend call failed',
        },
      })
    );
  }
}
