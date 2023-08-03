import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from 'src/assets/model/UserData';

@Injectable({
  providedIn: 'root'
})
export class GerenciaEstadoService {

  constructor() { }

  userData$ = new BehaviorSubject<UserData>({} as UserData);

  setUserData(userData: UserData){
    this.userData$.next(userData);
  }
}
