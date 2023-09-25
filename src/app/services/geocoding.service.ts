import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, switchMap } from 'rxjs';
import { GeocoderResponse } from 'src/assets/model/GeocoderResponse';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocodeLatLng(location: google.maps.LatLngLiteral): Observable<GeocoderResponse> {
    let geocoder = new google.maps.Geocoder();

    return new Observable<GeocoderResponse>(observable => {
      geocoder.geocode({ 'location': location }, (results, status) => {
        const response = new GeocoderResponse(status, results);
        observable.next(response);
        observable.complete();
      });
    })
  }

  getLocation(term: string): Observable<GeocoderResponse> {
    const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${environment.apiKeyGoogle}`;
    return this.http.get<GeocoderResponse>(url);
  }

  getDistanceMatrix(route: any): Observable<any> {
    const matrix = new google.maps.DistanceMatrixService();
    return new Observable(observable=>{
      matrix.getDistanceMatrix({
          origins: [new google.maps.LatLng(route.origin.lat, route.origin.lng)],
          destinations: [new google.maps.LatLng(route.destination.lat, route.destination.lng)],
          travelMode: google.maps.TravelMode.DRIVING,
      }, (response) => {
        observable.next(response);
        observable.complete();
      });
    });
  }

  getGeocoding(valueChange: any) {
    return new Observable(observable => {
      this.getLocation(valueChange)
      .pipe(
        switchMap((location: any) => this.geocodeLatLng(location?.results[0]?.geometry?.location))
      )
      .subscribe({
        next: (geocoding) => {
          observable.next(geocoding);
          observable.complete();
        },
        error: (e) => console.log('Deu erro!' + e)
      })
    })
  }
}
