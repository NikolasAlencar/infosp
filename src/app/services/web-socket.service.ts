import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Socket, io } from "socket.io-client";
import { GerenciaEstadoService } from './gerencia-estado.service';

const API_SOCKET_URL = environment.apiWebSocket;

@Injectable()
export class WebSocketService {

  constructor(private gerenciaEstado: GerenciaEstadoService) { }

  socket!: Socket<any>;

  setupSocketConnection() {
    this.socket = io(API_SOCKET_URL);

    this.socket.on('getNotificacoes', (notificacao: any) => this.gerenciaEstado.setNotification(notificacao));
  }
}
