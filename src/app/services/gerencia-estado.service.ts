import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserData } from 'src/assets/model/UserData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GerenciaEstadoService {

  constructor() { }

  urlImg = environment.urlImg;
  userData$ = new BehaviorSubject<UserData>({} as UserData);
  cachePosts$ = new BehaviorSubject<any>([]);
  cacheNotification$ = new BehaviorSubject<any>({});
  lastNotification$ = new BehaviorSubject<any>({});
  allNotifications$ = new BehaviorSubject<any>([]);

  setUserData(userData: UserData){
    this.userData$.next(userData);
  }

  setCachePosts(cachePosts: any){
    this.cachePosts$.next(cachePosts);
  }

  setNotification(lastNotification: any){
    this.lastNotification$.next(lastNotification);
    this.setAllNotifications(this.getBodyNotification(lastNotification));
  }

  setCacheNotification(cacheNotification: any){
    this.cacheNotification$.next(cacheNotification);
  }

  setAllNotifications(allNotifications: any){
    this.allNotifications$.next(allNotifications)
  }

  getBodyNotification = (body: any) => {
    const newNotification = {
      idPost: body.idPost,
      dataPost: body.dataPost,
      imgPost: body.imgPost,
      descricao: body.descricao,
      titulo: body.titulo,
      localizacao: body.localizacao
    }
    const notifications = this.allNotifications$.getValue();
    notifications.push(newNotification)
    return notifications
  }
}
