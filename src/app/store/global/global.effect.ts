import { Actions, createEffect, ofType } from '@ngrx/effects';
import { timer, exhaustMap, of, delay } from 'rxjs';
import { hideAlert, showAlert } from './global.action';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalEffect {
  hideAlertAfterShow = createEffect(() =>
    this.actions$.pipe(
      ofType(showAlert),
      delay(5000),
      exhaustMap(() => {
        console.log('hi');
        return of(hideAlert());
      })
    )
  );

  constructor(private actions$: Actions) {}
}
