import { Injectable } from '@angular/core';

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
    return new Promise<Position>((resolve, reject) => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude});
        }, () => reject('Permita o acesso a localização para uma melhor experiência!'),
        {enableHighAccuracy: true});
      } else{
        reject('Erro ao obter localização!');
      }
    })
  }
}
