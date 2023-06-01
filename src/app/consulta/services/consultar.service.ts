import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "src/assets/model/Client";
import { retiraEspeciais } from "src/assets/util/retiraEspeciais";
import { ConsultarAcoes } from "../model/ConsultarAcao";
import { environment } from "src/environments/environment";
import { bodyReq } from "src/assets/util/bodyReq";

const {headers, body} = bodyReq

@Injectable({
  providedIn: "root"
})
export class ConsultarService {
  constructor(private http: HttpClient) {}

  private clienteConsultado!: Client;

  getOptions(option: string): Observable<any> {
    return this.http.post<ConsultarAcoes>(`${environment.api}/obter/options/${option}`, body, {headers})
  }

  obtemClienteByParam(param: any): Observable<any>{ // REDUZINDO AS FUNÇÕES A UMA SÓ E TIRANDO O SWITCH
    return this.http.post(`${environment.api}/obter/clientes/${param}`, {param}, {headers})
  }

  obtemClienteByCpf(cpf: string): Observable<any> {
    return this.http.post(`${environment.api}/obter/clientes/cpf`, {cpf}, {headers})
  }

  obtemClienteByAgenciaEConta(conta: string): Observable<any> {
    return this.http.post(`${environment.api}/obter/clientes/conta`, {conta}, {headers})
  }

  obtemClienteByCelular(celular: string): Observable<any> {
    return this.http.post(`${environment.api}/obter/clientes/celular`, {celular}, {headers})
  }

  obtemClienteByid(id: string): Observable<any> {
    return this.http.post(`${environment.api}/obter/clientes/id`, {id}, {headers})
  }

  consultar(opcaoSelecionada: string, valorDigitado: string): Observable<any> {
    switch (opcaoSelecionada) {
      case "cpf":
        return this.obtemClienteByCpf(valorDigitado);
      case "conta":
        valorDigitado = valorDigitado.substring(5)
        return this.obtemClienteByAgenciaEConta(valorDigitado);
      case "celular":
        valorDigitado = retiraEspeciais(valorDigitado);
        return this.obtemClienteByCelular(valorDigitado);
      case "userid":
        return this.obtemClienteByid(valorDigitado);
    }
    return new Observable
  }

  setCliente(cliente: any): void{
    this.clienteConsultado = cliente
  }

  getCliente(): any{
    return this.clienteConsultado
  }
}
