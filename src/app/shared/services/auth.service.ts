import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EncryptionService } from './encryption.service';
import { Store } from '@ngrx/store';
import { AppState } from '../models/store.model';
import { loadUser } from 'src/app/store';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginError = new Subject<string>();

  constructor(
    private _http: HttpService,
    private _e2e: EncryptionService,
    private store: Store<AppState>,
    private _router: Router
  ) {}

  initiateSubmit(data: any) {
    this._e2e.getKey().subscribe((callDone) => {
      const payload = {
        ...data,
        password: callDone
          ? this._e2e.encryptData(data.password)
          : data.password,
      };
      this.submit('auth', data.name ? 'register' : 'login', payload);
    });
  }

  submit(service: string, route: string, data: Object) {
    (<Observable<any>>this._http.httpPost(service, route, data)).subscribe({
      next: (res) => {
        if (route === 'login') {
          this.store.dispatch(
            loadUser({
              payload: {
                userId: res.id,
                email: res.email,
                userName: res.name,
              },
            })
          );
          this._router.navigate(['dashboard/main'], {
            skipLocationChange: true,
            queryParamsHandling: 'preserve',
          });
        } else {
          if (res.success) {
            this._router.navigate(['auth/login'], {
              skipLocationChange: true,
              queryParamsHandling: 'preserve',
            });
          } else {
            console.log(res);
          }
        }
      },
      error: (err) => {
        console.log(err);
        if (err.type) {
          switch (err.type) {
            case 'invalidData':
            case 'existingUser':
              this.loginError.next(err.message);
              break;

            default:
              console.error(err);
          }
        }
      },
    });
  }
}
