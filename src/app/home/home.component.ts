import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { NavigateService } from '../services/navigate.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private navigate: NavigateService, private service: HomeService, private errorService: ErrorService) { }

  options$ = this.service.getOptions('options-home').pipe(
    catchError(async (error) => this.errorService.trazerErro())
  )

  public navegarOpcaoSelecionada = (path: string) => {
    this.navigate.navegarOpcaoSelecionada(path)
  };

  ngOnInit(): void {
    this.navigate.adicionaHistoria()
  }

}
