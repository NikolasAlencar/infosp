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
  cachePosts$ = new BehaviorSubject<any>({});
  cacheNotification$ = new Subject<any>();
  lastNotification$ = new Subject<any>();

  setUserData(userData: UserData){
    this.userData$.next(userData);
  }

  setCachePosts(cachePosts: any){
    this.cachePosts$.next(cachePosts);
  }

  setNotification(lastNotification: any){
    this.lastNotification$.next(lastNotification);
  }

  setCacheNotification(cacheNotification: any){
    this.cacheNotification$.next(cacheNotification);
  }
}
