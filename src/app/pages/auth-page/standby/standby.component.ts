import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standby',
  templateUrl: './standby.component.html',
  styleUrls: ['./standby.component.css'],
})
export class StandbyComponent {
  constructor(private _router: Router) {}

  backToDashboard() {
    this._router.navigate(['dashboard/main'], {
      skipLocationChange: true,
      queryParamsHandling: 'preserve',
    });
  }
}
