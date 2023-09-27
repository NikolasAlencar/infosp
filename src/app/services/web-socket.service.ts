import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Socket, io } from "socket.io-client";

const API_SOCKET_URL = environment.apiWebSocket;

@Injectable()
export class WebSocketService {

  constructor() { }

  socket!: Socket<any>;

  setupSocketConnection() {
    this.socket = io(API_SOCKET_URL);

    this.socket.on('getNotificacoes', (notificacoes: any) => {
      console.log(notificacoes);
    });
  }
}
