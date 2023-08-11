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

  setUserData(userData: UserData){
    this.userData$.next(userData);
  }

  setCachePosts(cachePosts: any){
    if(typeof cachePosts[0].idPost === 'number'){
      cachePosts[0].idPost = `${this.urlImg + cachePosts[0].idPost}.jpg`
      cachePosts[0].imgPost = `${this.urlImg + cachePosts[0].imgPost}.jpg`
      if(cachePosts[0].imgUsuario){
        cachePosts[0].imgUsuario = `${this.urlImg + cachePosts[0].imgUsuario}.jpg`;
      }else{
        cachePosts[0].imgUsuario = environment.defaultUrlImg;
      }
    }
    this.cachePosts$.next(cachePosts);
  }
}
