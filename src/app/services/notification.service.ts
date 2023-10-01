import { Injectable, NgZone } from '@angular/core';
import { NavigateService } from './navigate.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private zone: NgZone, private navigate: NavigateService, private util: UtilService) { }

  showNotification(notificationBody?: any){
    const notification = new Notification(notificationBody.titulo, this.verificaGenerico(notificationBody));
    notification.onclick = () => {
      this.zone.run(() => {
        if(this.isLogged()) this.navigate.navegarParaFeed();
      });
    }
  }

  isLogged(){
    return sessionStorage.getItem('TOKEN');
  }

  verificaGenerico(notificationBody: any){
    return {
      body: notificationBody.descricao || 'Notificação genérica!',
      icon: notificationBody.imgPost ?  this.util.getImg(notificationBody.imgPost) : '../../assets/icons/aviao.jpg'
    }
  }

  notifyMe() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      this.showNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          this.showNotification();
        }
      });
    }
  }
}
