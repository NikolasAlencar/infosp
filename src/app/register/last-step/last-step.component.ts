import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { map, distinctUntilChanged, filter } from "rxjs";
import { AuthorizationService } from "src/app/authorization/authorization.service";
import { EnviaMensagemService } from "src/app/services/envia-mensagem.service";
import { ErrorService } from "src/app/services/error.service";
import { NavigateService } from "src/app/services/navigate.service";
import { User } from "src/assets/model/User";
import { randomNum } from "src/assets/util/randomNum";
import { RegisterService } from "../services/register.service";
import { GerenciaEstadoService } from "src/app/services/gerencia-estado.service";

@Component({
  selector: "app-last-step",
  templateUrl: "./last-step.component.html",
  styleUrls: ["./last-step.component.scss"]
})
export class LastStepComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: RegisterService,
              private navigate: NavigateService,
              private mensagemService: EnviaMensagemService,
              private erroService: ErrorService,
              private authService: AuthorizationService,
              private gerenciaEstado: GerenciaEstadoService) {}

  registrar = this.fb.group({ codigo: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]] });

  emailEnviado: boolean = false;

  acabouTempo: boolean = false;

  user = this.router.getCurrentNavigation()?.extras as User // recebe o user por navegação

  // adiciona o usuario, autentica com o token e navega
  cadastrar(): void{
    this.service.addUser(this.user.params).subscribe({
      next: (token) => {
        const userData = this.getUserData(this.user.params);
        this.authService.saveUserInfo(token);
        this.gerenciaEstado.setUserData(userData);
        this.mensagemService.sucesso(`O usuário ${userData?.usuario} foi criado!`);
        this.navigate.navegarParaFeed();
      },
      error: () => this.erroService.trazerErro()
    })
  }

  acabou($event: any){
    this.service.cod = 0;
    this.acabouTempo = $event.acabou
  }

  // limpa o input, gera um código e envia pelo email
  reiniciar(){
    const userData = this.getUserData(this.user.params);
    this.registrar.get('codigo')?.setValue('')
    this.service.cod = randomNum(100000, 999999)
    this.service.enviaEmailRegister(userData?.email, this.service.cod)
    .subscribe(() => this.acabouTempo = false)
  }

  getUserData(user: any){
    try{
      return JSON.parse(user.get('body'))
    }catch(e){
      return user
    }
  }

  // gera erro e não habilita o botão caso o código não esteja correto
  ngOnInit(): void {
    if(this.user){
      this.registrar.get('codigo')?.valueChanges.pipe(
        filter(v => v >=6 || v.length),
        distinctUntilChanged(),
        map(v => Number(v) === this.service.cod),
      ).subscribe(iguais => iguais ? '' : this.registrar.get('codigo')?.setErrors({ naoIguais: true }) )
    } else{
      this.erroService.trazerErro()
    }
  }
}
