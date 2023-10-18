import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/store.model';
import { setAppProcessing, showAlert } from 'src/app/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<AppState>, private _router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(setAppProcessing({ payload: false }));
  }

  openModal() {
    this._router.navigate(['auth/reset', { title: 'My note' }], {
      skipLocationChange: true,
      queryParamsHandling: 'preserve',
    });
  }
}
