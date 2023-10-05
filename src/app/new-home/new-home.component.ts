import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../services/navigate.service';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {

  constructor(private navigate: NavigateService) { }

  ngOnInit(): void {
  }

  registrar() {
    this.navigate.navegarParaRegistro();
  }

  isLogged(){
    return sessionStorage.getItem('TOKEN');
  }

  navegar(){
    this.isLogged() ? this.navigate.navegarParaFeed() : this.navigate.navegarParaLogin();
  }
}
