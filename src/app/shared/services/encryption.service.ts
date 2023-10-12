import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { AES } from 'crypto-js';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  key: string = '';

  constructor(private _http: HttpService) {}

  getKey(): Observable<boolean> {
    return new Observable((observer) => {
      (<Observable<{ key: string }>>(
        this._http.httpGet('encryption', 'key')
      )).subscribe({
        next: (res) => {
          this.key = res.key;
          ConfigService.set('encryption', this.key);
          observer.next(true);
        },
        error: (err) => {
          observer.next(false);
        },
      });
    });
  }

  encryptData(data: string) {
    return AES.encrypt(data, this.key).toString();
  }
}
