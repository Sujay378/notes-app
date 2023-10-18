import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'note-core',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.navigate(['dashboard/main'], {
      skipLocationChange: true,
      queryParamsHandling: 'preserve',
    });
  }
}
