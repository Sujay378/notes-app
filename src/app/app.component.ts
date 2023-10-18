import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/models/store.model';
import { setAppProcessing } from './store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'notes';

  constructor(
    private store: Store<AppState>,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //   .subscribe((url) => {
    //   console.log(url);
    //   if (url.length <= 1) {
    //     this._router.navigate(['dashboard/main'], {
    //       skipLocationChange: true,
    //       queryParamsHandling: 'preserve',
    //     });
    //   }
    // });
  }
}
