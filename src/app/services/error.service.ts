import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigateService } from './navigate.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private navigate: NavigateService, private _snackBar: MatSnackBar) { }

  erroConsulta(message: string){
    this._snackBar.open(message, 'Fechar', {
      duration: 2000
    })
  }

  trazerErro(){
    this.navigate.navegarParaErro()
  }
}
