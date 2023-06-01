import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EnviaMensagemService } from 'src/app/services/envia-mensagem.service';
import { DadosPessoaisService } from './services/dados-pessoais.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  constructor(private router: Router, public service: DadosPessoaisService, private enviaMensagem: EnviaMensagemService) { }

  public clienteConsultado = this.router.getCurrentNavigation()?.extras;

  @Output() emiteDados = new EventEmitter<any>()

  recebeDados($event: any){
    $event.update ? this.service.updateClient($event.dados).subscribe(() => {
      this.enviaMensagem.sucesso(`Cliente ${$event.dados.nome} atualizado com sucesso!`)
    }) :
    this.service.dados$.next($event.dados)
  }

  ngOnInit(): void { }

}
