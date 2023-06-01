import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../services/navigate.service';

@Component({
  selector: 'app-erro-generico',
  templateUrl: './erro-generico.component.html',
  styleUrls: ['./erro-generico.component.scss']
})
export class ErroGenericoComponent implements OnInit {

  constructor(private navigate: NavigateService) { }

  voltar(): void{
    this.navigate.navegarParaLogin()
  }

  ngOnInit(): void {
  }

}
