import { EventEmitter, Injectable } from '@angular/core';
import { ModalConfig } from '../models/prompt.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public initiateAlert = new EventEmitter<{ type?: string; message: string }>();
  public closeAlert = new EventEmitter();

  public openModal = new EventEmitter<ModalConfig>();
  public closeModal = new EventEmitter();
  constructor() {}
}
