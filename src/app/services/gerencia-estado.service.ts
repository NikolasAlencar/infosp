import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from 'src/assets/model/UserData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GerenciaEstadoService {

  constructor() { }

  urlImg = environment.urlImg;
  userData$ = new BehaviorSubject<UserData>({} as UserData);
  cachePosts$ = new BehaviorSubject<any>({});
  lastNotification$ = new BehaviorSubject<any>({});

  setUserData(userData: UserData){
    this.userData$.next(userData);
  }

  setCachePosts(cachePosts: any){
    this.cachePosts$.next(cachePosts);
  }

  setNotification(lastNotification: any){
    this.lastNotification$.next(lastNotification);
  }
}
