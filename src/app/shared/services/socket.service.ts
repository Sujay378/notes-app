import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io(`${environment.protocol}//${environment.host}`);
    this.socket.on('connect', () => {
      console.log('Websocket connected');
    });
  }

  registerEvent(eventName: string) {
    return new Observable((observer) => {
      this.socket.on(eventName, (payload: any) => {
        observer.next(payload);
      });
    });
  }

  returnToLogin() {
    return this.registerEvent('return_logon');
  }
}
