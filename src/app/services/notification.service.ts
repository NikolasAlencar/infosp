import { Injectable, NgZone } from '@angular/core';
import { NavigateService } from './navigate.service';
import { UtilService } from './util.service';
import { GerenciaEstadoService } from './gerencia-estado.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private zone: NgZone, private navigate: NavigateService, private util: UtilService, private gerenciaEstado: GerenciaEstadoService) { }

  showNotification(notificationBody?: any){
    const observer = this.gerenciaEstado.lastNotification$.subscribe(notificacao => {
      if(this.gerenciaEstado.cacheNotification$.getValue()?.post?.idPost !== notificacao.idPost){
        const notification = new Notification(notificationBody.titulo || 'Notificação genérica!', this.verificaGenerico(notificationBody));
        notification.onclick = () => {
          this.zone.run(() => {
            if(this.isLogged()) this.navigate.navegarParaFeed(this.verificaGenerico(notificationBody));
          });
        }
      }
    })
    observer.unsubscribe();
  }

  isLogged(){
    return sessionStorage.getItem('TOKEN');
  }

  verificaGenerico(notificationBody: any){
    return {
      idPost: notificationBody.idPost || 999999999,
      body: notificationBody.descricao || 'Notificação genérica!',
      icon: notificationBody.imgPost ?  this.util.getImg(notificationBody.imgPost) : 'assets/icons/aviao.jpg'
    }
  }

  notifyMe() {
    if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }
}
