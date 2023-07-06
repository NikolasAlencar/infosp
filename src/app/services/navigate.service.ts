import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NavigateService {
  constructor(private router: Router) {}

  public historia: Array<string> = [""];

  navegarParaLogin() {
    this.router.navigate(["/login"]);
  }

  navegarParaHome(params?: any) {
    this.router.navigate(["/home"], params);
  }

  navegarParaFeed() {
    this.router.navigate(["/feed"]);
  }

  navegarParaInicio() {
    this.router.navigate(["/home"]);
  }

  navegarParaErro() {
    this.router.navigate(["/erro-generico"]);
  }

  navegarParaRegistro() {
    this.router.navigate(["/register"]);
  }

  navegarParaLastStep(params?: any, cod?: any) {
    this.router.navigate(["/register/last-step"], {params, cod} as NavigationExtras);
  }

  navegarOpcaoSelecionada(local: string) {
    this.router.navigate(["/home/" + local]);
  }

  navegarPara(local: string) {
    this.router.navigate(["/" + local]);
  }

  navegar(local: any){
    this.router.navigate(local)
  }

  voltar() {
    this.navegarPara(this.historia[this.historia.length - 2]);
    this.historia.pop();
  }

  adicionaHistoria() {
    if (this.router.url !== this.historia[this.historia.length - 1] || "") {
      this.historia.push(this.router.url);
    }
  }
}
