import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnviaEmailService {

  constructor(private http: HttpClient) { }

  enviaEmail(corpoEmail: any){
    return this.http.post(environment.apiSendEmail, corpoEmail)
  }
}
