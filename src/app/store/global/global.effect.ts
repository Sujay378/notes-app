import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of, delay, tap, map } from 'rxjs';
import { hideAlert, showAlert } from './global.action';
import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable()
export class GlobalEffect {
  hideAlertAfterShow = createEffect(() =>
    this.actions$.pipe(
      ofType(showAlert),
      tap((action) => {
        this._alertService.initiateAlert.emit({
          type: action.payload.type,
          message: action.payload.message,
        });
      }),
      delay(5000),
      exhaustMap(() => {
        console.log('hi');
        return of(hideAlert());
      })
    )
  );

  executeHideAlert = createEffect(
    () =>
      this.actions$.pipe(
        ofType(hideAlert),
        tap((action) => {
          this._alertService.closeAlert.emit();
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private _alertService: AlertService) {}
}
