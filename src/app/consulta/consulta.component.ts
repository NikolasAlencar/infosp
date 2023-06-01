import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NavigationExtras } from "@angular/router";
import { formalizaValor } from "src/assets/util/formalizaValor";
import { ConsultarService } from "./services/consultar.service";
import { NavigateService } from "../services/navigate.service";
import { ErrorService } from "../services/error.service";
import { catchError } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.scss"]
})
export class ConsultaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: ConsultarService,
    private navigate: NavigateService,
    private erroService: ErrorService
  ) {}

  @Input() reuse: boolean = false;
  @Output() emiteDados = new EventEmitter<any>();

  public consultar = this.fb.group({
    radio: ["1", [Validators.required]],
    CPF: ["", [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
    Celular: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    userId: ["", [Validators.required, Validators.minLength(1)]],
    "Agência/Conta": ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13)]]
  });

  acoes$ = this.service.getOptions('consultar-acoes').pipe(
    catchError(async (error) => this.erroService.trazerErro())
  );

  public loading: boolean = false;
  public opcaoSelecionada: number = 0;

  public pesquisar(opcaoSelecionada: string) {
    this.loading = true;
    if(this.consultar.controls[opcaoSelecionada].valid){
      this.consultar.markAsUntouched();
      this.service.consultar(formalizaValor(opcaoSelecionada), this.consultar.get(opcaoSelecionada)?.value)
        .subscribe({
          next: (c) => {
            if(_.isEmpty(c)){
              this.erroService.erroConsulta('Não foi encontrado dados para a sua pesquisa!');
              this.loading = false;
            }else{
              this.service.setCliente(c)
              this.loading = false;
              this.reuse ?
              this.emiteDados.emit(this.service.getCliente()) :
              this.navigate.navegarParaHome(this.service.getCliente() as NavigationExtras)
            }
          }, error: () => this.erroService.trazerErro()
        })
    }else{
       this.consultar.markAllAsTouched();
       this.loading = false;
     }
  }

  ngOnInit(): void {
    this.consultar.get('radio')?.valueChanges.subscribe(() => this.opcaoSelecionada = this.consultar.get('radio')?.value-1)
    this.navigate.adicionaHistoria()
  }
}
