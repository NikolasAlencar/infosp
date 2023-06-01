import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bodyReq } from 'src/assets/util/bodyReq';
import { environment } from 'src/environments/environment';
import { OptionsCrivo } from '../model/OptionCrivo';

@Injectable({
  providedIn: 'root'
})
export class CrivoService {

  constructor(private http: HttpClient) { }

  getOptions(option: string): Observable<any> {
    const {headers, body} = bodyReq
    return this.http.post<OptionsCrivo>(`${environment.api}/obter/options/${option}`, body, {headers})
  }
}
