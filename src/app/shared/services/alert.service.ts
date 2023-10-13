import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public initiateAlert = new EventEmitter<{ type?: string; message: string }>();
  public closeAlert = new EventEmitter();
  constructor() {}
}
