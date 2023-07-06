import { Injectable, NgZone } from '@angular/core';
import { NavigateService } from './navigate.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private zone: NgZone, private navigate: NavigateService) { }

  showNotification(){
    const notification = new Notification("Avião capota em São Paulo",
    { body: 'Avião acaba tendo um trágico fim essa tarde ao capotar na rua da sua mãe', icon: '../../assets/icons/aviao.jpg'});
    notification.onclick = () => {
      this.zone.run(() => {if(this.isLogged()) this.navigate.navegarParaFeed()});
    }
  }

  isLogged(){
    return sessionStorage.getItem('TOKEN');
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
