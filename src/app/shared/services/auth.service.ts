import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EncryptionService } from './encryption.service';
import { Store } from '@ngrx/store';
import { AppState } from '../models/store.model';
import { loadUser, setAppProcessing, showAlert } from 'src/app/store';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ResetPassword } from '../models/payload.model';

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
    this.store.dispatch(setAppProcessing({ payload: true }));
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
          this.store.dispatch(setAppProcessing({ payload: false }));
          this.store.dispatch(
            showAlert({ payload: { message: `Welcome Back ${res.name}` } })
          );
        } else {
          if (res.success) {
            this._router.navigate(['auth/login'], {
              skipLocationChange: true,
              queryParamsHandling: 'preserve',
            });
            this.store.dispatch(setAppProcessing({ payload: false }));
            this.store.dispatch(
              showAlert({
                payload: {
                  type: 'success',
                  message: 'Registration successful! Please login',
                },
              })
            );
          } else {
            //go to error page
            console.log(res);
          }
        }
      },
      error: (err) => {
        console.log(err);
        if (err.type) {
          switch (err.type) {
            case 'invalidData':
              this.store.dispatch(
                showAlert({
                  payload: {
                    type: 'error',
                    message: 'Username or Password was wrong',
                  },
                })
              );
              break;
            case 'existingUser':
              this._router.navigate(['auth/login'], {
                skipLocationChange: true,
                queryParamsHandling: 'preserve',
              });
              this.store.dispatch(
                showAlert({
                  payload: {
                    message: 'You already have an Account please login',
                  },
                })
              );
              break;
            default:
              console.error(err);
          }
        }
      },
    });
  }

  forgotPassword(data: { email: string }) {
    const payload = data;
    this.store.dispatch(setAppProcessing({ payload: true }));
    this._http.httpPost('auth', 'forgot', payload).subscribe({
      next: () => {
        this._router.navigate([], {
          skipLocationChange: true,
          queryParamsHandling: 'preserve',
        });
      },
      error: (err) => {
        let route: string;
        switch (err.type) {
          case 'invalidUser':
            route = 'auth/standby';
            break;
          default:
            //route to error
            route = 'error';
        }

        this._router.navigate([route], {
          skipLocationChange: true,
          queryParamsHandling: 'preserve',
        });
      },
    });
  }

  resetPassword(payload: ResetPassword) {
    console.log(payload);
  }
}
