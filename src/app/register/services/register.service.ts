import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnviaEmailService } from 'src/app/services/envia-email.service';
import { bodyReq } from 'src/assets/util/bodyReq';
import { environment } from 'src/environments/environment';
import { OptionsRegister } from '../model/OptionRegister';

const {headers, body} = bodyReq

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private enviaEmailService: EnviaEmailService) { }

  cod!: number;

  getOptions(option: string): Observable<any> {
    return this.http.post<OptionsRegister>(`${environment.api}/obter/options/${option}`, body, {headers})
  }

  getUser(name: string): Observable<any> {
    return this.http.post(`${environment.api}/obter/user/nome`, {name}, {headers})
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.post(`${environment.api}/obter/user/email`, {email}, {headers})
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${environment.api}/adicionar/novo-usuario`, {user, title: 'new-user'}, {headers})
  }

  public enviaEmailRegister(destinatario: string, cod: number){
    const corpoEmail = {
      to: destinatario,
      subject: "Código de Confirmação - Backoffice Wallet",
      message: `Olá, o seu código de verificação é o ${cod}`
    }
    return this.enviaEmailService.enviaEmail(corpoEmail)
  }
}
