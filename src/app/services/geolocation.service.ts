import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Position {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getUserLocation() {
    return new Observable<Position>(observable => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          observable.next({ latitude: position.coords.latitude, longitude: position.coords.longitude});
          observable.complete();
        }, () => {
          observable.error('Permita o acesso a localização para uma melhor experiência!');
          observable.complete();
        },
        {enableHighAccuracy: true});
      } else{
        observable.error('Erro ao obter localização!');
        observable.complete();
      }
    })
  }
}
