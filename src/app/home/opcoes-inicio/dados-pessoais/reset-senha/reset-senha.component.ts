import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent implements OnInit {

  constructor() { }

  public resetar(){
    console.log('RESETAR')
  }

  ngOnInit(): void {
  }

}
