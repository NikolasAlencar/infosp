import { Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConsultaComponent } from "src/app/consulta/consulta.component";
import { ConsultarService } from "src/app/consulta/services/consultar.service";
import { ajustaGrid } from "src/assets/util/ajustaGrid";
import { separaNome } from "src/assets/util/separaNome";
import { OptionsDados } from "./model/OptionDado";
import { OptionsEndereco } from "./model/OptionEndereco";

@Component({
  selector: "app-dados",
  templateUrl: "./dados.component.html",
  styleUrls: ["./dados.component.scss"]
})
export class DadosComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private consultarService: ConsultarService,
    private dialog: MatDialog
    ) {}

  public innerWidth = ajustaGrid();

  @HostListener("window:resize")
  onResize() {
    this.innerWidth = ajustaGrid();
  }

  @ViewChild('consulta', { static: true })
  consulta!: TemplateRef<ConsultaComponent>

  abrirConsulta(param?: string) {
    this.erro = param === 'again' ? '' : "Você ainda não consultou nenhum cliente! Gostaria de consultar agora?"
    this.dialog.open(this.consulta)
  }

  erro!: string

  @Input() clienteConsultado: any;
  @Output() emiteDados = new EventEmitter<any>();

  maxDate = new Date(new Date().getFullYear()-18, 0, 1)
  minDate = new Date(new Date().getFullYear()-80, 0, 1)

  optionsDados: OptionsDados = [
    { name: "id", desc: "Id", erro: "" },
    { name: "nomeCompleto", desc: "Nome completo", erro: "" },
    { name: "cpf", desc: "CPF", erro: "" },
    { name: "dataDeNascimento", desc: "Data de nascimento", erro: "" },
    { name: "nomeDaMae", desc: "Nome da mãe", erro: "" },
    { name: "email", desc: "Email", erro: "" }
  ];

  optionsEndereco: OptionsEndereco = [
    { name: "cep", desc: "Cep", erro: "endereco.cep" },
    { name: "logradouro", desc: "Logradouro", erro: "endereco.logradouro" },
    { name: "numero", desc: "Número", erro: "endereco.numero" },
    { name: "cidade", desc: "Cidade", erro: "endereco.cidade" },
    { name: "bairro", desc: "Bairro", erro: "endereco.bairro" },
    { name: "estado", desc: "Estado", erro: "endereco.estado" },
    { name: "complemento", desc: "Complemento", erro: "endereco.complemento" }
  ];

  public formulario = this.fb.group({
    nomeCompleto: ["", [Validators.required, Validators.minLength(20), Validators.maxLength(70)]],
    cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
    id: [""],
    dataDeNascimento: [""],
    email: ["", [Validators.required, Validators.minLength(20), Validators.maxLength(50)]],
    nomeDaMae: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(100)]],
    endereco: this.fb.group({
      cep: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      logradouro: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      numero: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(7)]],
      cidade: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      bairro: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      complemento: [""],
      estado: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
    })
  });

  // atualizar dados
  public confirmar(): void {
    const dataDeNascimento = new Date(this.formulario.value.dataDeNascimento).toLocaleDateString()
    const nomeSeparado = separaNome(this.formulario.value.nomeCompleto)
    this.clienteConsultado = Object.assign(this.clienteConsultado, {...this.formulario.value, ...nomeSeparado })
    this.clienteConsultado.dataDeNascimento = dataDeNascimento
    this.emiteDados.emit({dados: this.clienteConsultado, update: true})
  }

  // consultar novamente
  public recebeDados($event: any){
    this.clienteConsultado = $event
    this.emiteDados.emit({dados: $event, update: false})
    this.dialog.closeAll()
    this.populaDados()
  }

  // popula todos os inputs
  populaDados(){
    const dadosGerais = this.optionsDados.concat(this.optionsEndereco)
    dadosGerais.map(option => {
      if(option.erro.includes('.')){
        this.formulario.get('endereco')?.get(option.name)?.setValue(this.clienteConsultado.endereco[option.name])
      }else if(option.name === 'nomeCompleto'){
        this.formulario.get('nomeCompleto')?.setValue(this.clienteConsultado.nome + " " + this.clienteConsultado.sobrenome)
      }else if(option.name === 'dataDeNascimento'){
        this.formulario.get(option.name)?.setValue(new Date(this.clienteConsultado[option.name]))
      }else{
        this.formulario.get(option.name)?.setValue(this.clienteConsultado[option.name])
      }
    })
    this.formulario.updateValueAndValidity()
  }

  ngOnInit(): void {
    if(this.clienteConsultado['nomeCompleto']) {
      this.populaDados()
    }else{
      this.consultarService.getCliente() ?
      (this.clienteConsultado = this.consultarService.getCliente(), this.populaDados()) :
      this.abrirConsulta()
    }
  }
}
