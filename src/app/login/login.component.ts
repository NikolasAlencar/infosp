import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthorizationService } from "../authorization/authorization.service";
import { ErrorService } from "../services/error.service";
import { NavigateService } from "../services/navigate.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthorizationService,
    private navigate: NavigateService,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {}

  public login = this.fb.group({
    usuario: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
    senha: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(20)]]
  });

  public loading: boolean = false;

  entrar() {
    this.loading = true;
    if (this.login.valid === false) {
      this.login.markAllAsTouched();
      this.loading = false;
    } else {
      this.login.markAsUntouched();
      this.logar(this.login.value);
    }
  }

  registrar() {
    this.navigate.navegarParaRegistro();
  }

  private logar(user: any) {
    this.authService
      .login(user).subscribe({
        next: () => {
          this.navigate.navegarParaConsulta();
        },
        error: () => {
          this.errorService.erroConsulta("Erro ao consultar o usuário informado, verifique os dados e tente novamente!")
        }
      })
      this.loading = false;
  }

  ngOnInit(): void {
    this.authService.logout();
    this.navigate.adicionaHistoria();
  }
}
