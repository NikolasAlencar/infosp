import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviar-para',
  templateUrl: './enviar-para.component.html',
  styleUrls: ['./enviar-para.component.scss']
})
export class EnviarParaComponent implements OnInit {

  constructor() { }

  public enviar(){
    console.log('ENVIAR')
  }

  ngOnInit(): void {
  }

}
