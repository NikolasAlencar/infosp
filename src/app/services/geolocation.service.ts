import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private zone: NgZone) { }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
      });
    }else {
      console.log("User not allow")
    }
  }

}
