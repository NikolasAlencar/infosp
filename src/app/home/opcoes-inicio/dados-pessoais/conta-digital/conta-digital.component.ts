import { Component, HostListener, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Subject } from "rxjs";
import { ajustaGrid } from "src/assets/util/ajustaGrid";
import { DadosPessoaisService } from "../services/dados-pessoais.service";
import { OptionsContaDigital } from "./model/OptionContaDigital";

@Component({
  selector: "app-conta-digital",
  templateUrl: "./conta-digital.component.html",
  styleUrls: ["./conta-digital.component.scss"]
})
export class ContaDigitalComponent implements OnInit {

  public innerWidth = ajustaGrid();

  @HostListener("window:resize")
  onResize() {
    this.innerWidth = ajustaGrid();
  }

  constructor(private fb: FormBuilder, private service: DadosPessoaisService){}

  @Input() clienteConsultado!: Subject<any>;
  cliente: any;

  optionsContaDigital: OptionsContaDigital = [
    { name: 'cadastroIniciadoEm', desc: "Cadastro iniciado em" },
    { name: 'agencia', desc: "Agencia" },
    { name: 'conta', desc: "Conta" },
    { name: 'cadastroCriadoEm', desc: "Cadastro criado em" }
  ];

  public formulario = this.fb.group({
    cadastroIniciadoEm: [""],
    agencia: [""],
    conta: [""],
    cadastroCriadoEm: [""]
  });

  ngOnInit(): void {
    if(this.service.getDados()){
      this.cliente = this.service.getDados(), this.populaDados()
      return
    }
    this.clienteConsultado.subscribe(c => {
      this.cliente = c
      this.populaDados()
    })
  }

  public populaDados(){
    // foreach
    this.optionsContaDigital.map((option: any) => {
      this.formulario.get(option.name)?.setValue(this.cliente[option.name])
    })
  }
}
