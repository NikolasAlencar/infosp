import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeocoderResponse } from 'src/assets/model/GeocoderResponse';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocodeLatLng(location: google.maps.LatLngLiteral): Promise<GeocoderResponse> {
    let geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'location': location }, (results, status) => {
        const response = new GeocoderResponse(status, results);
        resolve(response);
      });
    });
  }

  getLocation(term: string): Observable<GeocoderResponse> {
    const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${environment.apiKeyGoogle}`;
    return this.http.get<GeocoderResponse>(url);
  }
}
