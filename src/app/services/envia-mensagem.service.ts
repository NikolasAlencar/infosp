import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EnviaMensagemService {

  constructor(public _snackBar: MatSnackBar) { }

  sucesso(message: string){
    this._snackBar.open(message, 'Fechar', {
      duration: 2000,
    })
  }
}
